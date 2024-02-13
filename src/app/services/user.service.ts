import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../interfaces/user.model';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { HashService } from './hash.service';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public db!: SQLiteDBConnection;
  public lastUser: User | null = null;
  public LoggedUser = false;
  public UsersList! : string[];

  private user!: User;
  private readonly jwtSecret = 'yourSecretKey';
  
  private listaUsuarios = new BehaviorSubject<User[]>([]);

  private baseUrl = 'http://localhost:3000'; 

  constructor( 

    private hashSvc: HashService,
    private utilsSvc: UtilService,
    private http: HttpClient
  
  ) { }

  // Send user data to the Node.js server for registration
  registerUserHTTP(userData: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/singin`, userData);
  }

  // Send login credentials to the Node.js server
  loginUserHTTP(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }

    // Función que crea las tablas correspondientes a los usuarios

  async createUserTables(db: SQLiteDBConnection):Promise<boolean>{

    try {
        await db.execute(`CREATE TABLE IF NOT EXISTS Usuarios (
                                id INTEGER PRIMARY KEY autoincrement, 
                                userName TEXT UNIQUE NOT NULL,
                                email  TEXT UNIQUE NOT NULL,
                                phone INTEGER,
                                name TEXT NOT NULL,
                                surname TEXT NOT NULL,
                                gender TEXT NOT NULL,
                                password TEXT NOT NULL,
                                country TEXT NOT NULL,
                                ccaa TEXT,
                                provincia TEXT
                                );`);
        
        this.db = db;
        
        this.fetchUsuarios();
        return true;

    } catch (error) {
        console.error('Error al crear las tablas:', error);
        return false;
    }

  }

  //Añadir un usuario NUEVO

  async StorageUser(userName: string, email: string, phone: number, name: string, surname: string, gender: string, 
                    Password: string, country: string, ccaa?: string, provincia?: string): Promise<boolean> {
    try {

      await this.db.run(`INSERT INTO Usuarios (userName, email, phone, name, surname, gender, password, country, ccaa, provincia) 
                          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                          [userName, email, phone, name, surname, gender, Password, country, ccaa, provincia]);
      this.fetchUsuarios();
      this.LoggedUser = true;
      this.lastUser = {
        userName: userName,
        email: email,
        phone: phone,
        name: name,
        surname: surname,
        gender: gender,
        password: Password,
        country: country,
        ccaa: ccaa,
        provincia: provincia
      }

      return true; // Success in adding the user

    } catch (error) {
        console.log('Usuario ya existe');
        return false; // Error in adding the user
    }
    
  } 

  // Busca y devuelve si exite el usuario por UserName o devuelve False

  async getUserByUserName(userName: string): Promise<User>{
    try{

        const result = await this.db.query(`SELECT * FROM Usuarios WHERE userName = ?`, [userName]);
        if (result.values && result.values.length > 0) {

            this.user = {
                id: result.values[0].id,
                userName: result.values[0].userName,
                email: result.values[0].email,
                phone: result.values[0].phone,
                name: result.values[0].name,
                surname: result.values[0].surname,
                gender: result.values[0].gender,
                password: result.values[0].password, // Be cautious with password handling
                country: result.values[0].country,
                ccaa: result.values[0].ccaa,
                provincia: result.values[0].provincia
            };
            return this.user;

        } else {
          console.log('Usuario no encontrado');
          return this.user;
        }

    }catch(error){
      this.utilsSvc.presentToast("Error al buscar el usuario");
      console.log('Error al buscar el usuario');
      return this.user;
    }
  }

  //  Devuelve un array con todos los usuarios guardados en la BD

  async fetchUsuarios(): Promise<boolean> {
    try {
        const result = await this.db.query(`SELECT * FROM Usuarios`);
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

  //Devuelve y comprueba la contraseña

  async verifyUserPassword(username: string, submittedPassword: string): Promise<boolean> {
    try{

      const result = await this.db.query(`SELECT password FROM Usuarios WHERE userName = ? LIMIT 1`, [username]);

      if (result.values && result.values.length > 0) {
          const storedHash = result.values[0].password;
          const isMatch = await this.hashSvc.verifyPassword(submittedPassword, storedHash);
          return isMatch;
      } else {
          // User not found
          return false;
      }
    } catch (error) {
      this.utilsSvc.presentToast("Error checking the password");
      console.error('Error checking the password:', error);
      return false; 
  }
}

  // Devulve si el usuario esta logeado (existe en la BBDD)
    
  async isUserLoggedIn(userName: string, rawPassword: string): Promise<boolean> {
    try {

        const user = await this.getUserByUserName(userName)
        console.log('Usuario encontrado: ', user.userName);

        if( user != null || user != undefined){
            // User Match

            if (await this.verifyUserPassword(userName, rawPassword)) {
                // Passwords match

                const response = await firstValueFrom(this.loginUserHTTP(userName, rawPassword));
    
                if (response && response.token) {
                  // If the server returns a token, login is successful
                  localStorage.setItem('jwtToken', response.token);
                  this.LoggedUser = true;
                  this.lastUser = user;
                  this.utilsSvc.routerLink('/home'); 
                  console.log('Login successful:', response);
                  return true;
                } else {
                  // Handle login failure (e.g., wrong credentials)
                  console.log("Login failed");
                  return false;
                }

            } else {
                // Passwords do not match
                this.utilsSvc.presentToast("La contraseña no es correcta");
                console.log('La contraseña no es correcta');
                return false;
            }

        }else{
            // User do not match
            this.utilsSvc.presentToast("No se ha encontrado el usuario");
            console.log('No se ha encontrado el usuario');
            return false;
        }

    } catch (error) {
        this.utilsSvc.presentToast("Error checking login status");
        console.error('Error checking login status:', error);
        return false; 
    } 
  }

  async fetchUsernames(): Promise<string[]> {
    try {
      const result = await this.db.query(`SELECT userName FROM Usuarios`);
      if (result.values) {
        const usernames = result.values.map(user => user.userName);
        return usernames;
      } else {
        return [];
      }
    } catch (error) {
      console.log('Lista vacia');
      return []; 
    }
  }

  async getUsernames(): Promise<string[]> {
    return await this.fetchUsernames();
  }  

  getLastUser(){
    return this.lastUser;
  }

  setLoggedUser(status: boolean){
    this.LoggedUser = status;
  }

  getLoggedUser(){
      return this.LoggedUser;
  }

}
