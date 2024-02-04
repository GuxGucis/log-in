import { Injectable } from '@angular/core';
import { MySqlite } from './mysqlite.service';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private db!: SQLiteDBConnection;

  constructor(
    private SqliteSvc: MySqlite
  ) { }

  //Añadir un usuario NUEVO

  async addUser(userName: string, Password: string) {
    try {

      this.db = this.SqliteSvc.getDB()
      await this.db.run(`INSERT INTO Usuarios (userName, password) VALUES (?, ?)`, [userName,  Password]);
      this.SqliteSvc.fetchUsuarios();
      this.SqliteSvc.LoggedUser = true;
      return true; // Success in adding the user

    } catch (error) {
        console.error('Error al agregar usuario:', error);
        return false; // Error in adding the user
    }
    
  } 

  //

}
