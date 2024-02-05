import { Injectable } from '@angular/core';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../interfaces/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private db!: SQLiteDBConnection;
  public lastUser: User | null = null;
  public LoggedUser = false;
  
  private listaUsuarios = new BehaviorSubject<User[]>([]);

  constructor( ) { }

  //Añadir un usuario NUEVO

  async StorageUser(db: SQLiteDBConnection, userName: string, email: string, Password: string) {
    try {

      await db.run(`INSERT INTO Usuarios (userName, email, password) VALUES (?, ?, ?)`, [userName, email,  Password]);
      this.fetchUsuarios(db);
      this.LoggedUser = true;
      return true; // Success in adding the user

    } catch (error) {
        console.error('Error al agregar usuario:', error);
        console.error('Error al agregar usuario, usuario ya existe');
        return false; // Error in adding the user
    }
    
  } 

  // Busca y devuelve si exite el usuario por UserName o devuelve False

  async getUserByUserName(userName: string){
    try{

        const result = await this.db.query(`SELECT * FROM Usuarios WHERE userName = ?`, [userName]);
        if (result.values && result.values.length > 0) {

            const user: User = {
                id: result.values[0].id,
                userName: result.values[0].userName,
                email: result.values[0].email,
                password: result.values[0].password, // Be cautious with password handling
            };
            return user;

        } else {
            return false;
        }

    }catch(error){
        console.log('Error al buscar el usuario');
        return false;
    }
  }

  //  Devuelve un array con todos los usuarios guardados en la BD

  async fetchUsuarios(db: SQLiteDBConnection) {
    try {
        const result = await db.query(`SELECT * FROM Usuarios`);
        let items = [];
        if(result.values != undefined){
            for (let i = 0; i < result.values.length; i++) {
                items.push(result.values[i]);
            }
            this.listaUsuarios.next(items);
            const users = this.listaUsuarios.getValue();
            this.lastUser = users.length > 0 ? users[users.length - 1] : null;
            return true;
        }else{
            return  false;
        }

    } catch (error) {
        console.error('Error al hacer fetch:', error);
        return false; // Error in adding the user
    }
  }

  setLoggedUser(status: boolean){
    this.LoggedUser = status;
  }

  getLoggedUser(){
      return this.LoggedUser;
  }

}
