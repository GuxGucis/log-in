import { Injectable} from '@angular/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../interfaces/user.model';
import { BehaviorSubject } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { HashService } from './hash.service';
import { UtilService } from './util.service';
import { UserService } from './user.service';

const DB_USERS = 'UserDB'

@Injectable()

export class MySqlite {

    private dbInitialized: boolean = false;

    sqlitePlugin!: CapacitorSQLitePlugin;
    sqliteConnection!: SQLiteConnection;
    private db!: SQLiteDBConnection;

    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

    constructor(
        private platform: Platform, 
        public toastController: ToastController,
        private hashSvc: HashService,
        private utilsSvc: UtilService,
        private userSvc: UserService
    ) {}

    // Función que inicializa la base de datos

    async initializeDB() {

        if(!this.dbInitialized){
            try{

                await this.platform.ready();
            
                this.sqlitePlugin = CapacitorSQLite;
                this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
                await this.sqliteConnection.initWebStore();

                this.db = await this.sqliteConnection.createConnection(DB_USERS, false, 'no-encryption', 1, false);
                
                await this.db.open();

                await this.createTables();

                await this.sqliteConnection.saveToStore(DB_USERS);

                return true;

            }catch(error){

                console.error('Error al crear la Base de datos:', error);
                return false;
            }
        } else {
            console.log("Database already initialized.");
        }
        return Promise.resolve();
    }

    // Función que crea las tablas correspondientes a los usuarios

    async createTables(){

        try {
            await this.db.execute(`CREATE TABLE IF NOT EXISTS Usuarios (
                                    id INTEGER PRIMARY KEY autoincrement, 
                                    userName TEXT UNIQUE NOT NULL,
                                    email  TEXT UNIQUE NOT NULL,
                                    password TEXT NOT NULL
                                    );`);
            
            this.userSvc.fetchUsuarios(this.db);
            this.isDBReady.next(true);
            return true;

        } catch (error) {
            console.error('Error al crear las tablas:', error);
            return false;
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

    // Devulve si el usuario esta logeado (existe en la BBDD)
    
    async isUserLoggedIn(userName: string, rawPassword: string): Promise<boolean> {
        try {

            const user = await this.userSvc.getUserByUserName(userName)

            if( user != false){
                // User Match
                const hashedPassword = this.hashSvc.HashingPassword(rawPassword); // Hash the password provided during login
                
                if (user.password === hashedPassword) {
                    // Passwords match
                    this.userSvc.LoggedUser = true;
                    return true;

                } else {
                    // Passwords do not match
                    this.utilsSvc.presentToast({
                        message: "La contraseña no es correcta",
                        duration: 5000, //milisegundos
                        color: 'warning',
                        icon: 'alert-circle-outline'
                      })
                    console.log('La contraseña no es correcta');
                    return false;
                }

            }else{
                // User do not match
                this.utilsSvc.presentToast({
                    message: "No se ha encontrado el usuario",
                    duration: 5000, //milisegundos
                    color: 'warning',
                    icon: 'alert-circle-outline'
                  })
                console.log('No se ha encontrado el usuario');
                return false;
            }

        } catch (error) {
            this.utilsSvc.presentToast({
                message: "Error",
                duration: 5000, //milisegundos
                color: 'warning',
                icon: 'alert-circle-outline'
              })
            console.error('Error checking login status:', error);
            return false; 
        }
    }

    async addUser(userName: string, email: string, Password: string){

        return await this.userSvc.StorageUser(this.db, userName, email, Password); 

    }

    // Devuelve la Base de Datos

    getDB(){
        return this.db;
    }

} 