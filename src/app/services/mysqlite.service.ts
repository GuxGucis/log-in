import { Injectable} from '@angular/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../interfaces/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Platform, ToastController } from '@ionic/angular';
import { HashService } from './hash.service';
import { UtilService } from './util.service';

const DB_USERS = 'UserDB'

@Injectable()

export class MySqlite {

    sqlitePlugin!: CapacitorSQLitePlugin;
    sqliteConnection!: SQLiteConnection;
    private db!: SQLiteDBConnection;

    private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
    private listaUsuarios = new BehaviorSubject<User[]>([]);

    private lastUser: User | null = null;
    public LoggedUser = false;

    constructor(
        private platform: Platform, 
        public toastController: ToastController,
        private hashSvc: HashService,
        private utilsSvc: UtilService
    ) {}

    // Función que inicializa la base de datos

    async initializeDB() {

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
    }

    // Función que crea las tablas correspondientes a los usuarios

    async createTables(){

        try {
            await this.db.execute(`CREATE TABLE IF NOT EXISTS Usuarios (
                                    id INTEGER PRIMARY KEY autoincrement, 
                                    userName TEXT UNIQUE NOT NULL,
                                    password TEXT NOT NULL
                                    );`);
            
            this.fetchUsuarios();
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
    
    async isUserLoggedIn(userName: string, rawPassword: string): Promise<boolean | string> {
        try {

            const user = await this.getUserByUserName(userName)

            if( user != false){
                // User Match
                const hashedPassword = this.hashSvc.HashingPassword(rawPassword); // Hash the password provided during login
                
                if (user.password === hashedPassword) {
                    // Passwords match
                    this.LoggedUser = true;
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

    //  Devuelve un array con todos los usuarios guardados en la BD

    async fetchUsuarios() {
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

    // Devuelve la Base de Datos

    getDB(): SQLiteDBConnection{
        return this.db;
    }

    // Devuelve  el ultimo usuario agregado a la lista o nulo si no hay ninguno
    
    getLastUser(): User | null {
        return this.lastUser;
    }

} 