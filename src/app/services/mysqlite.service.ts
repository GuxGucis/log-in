import { Injectable} from '@angular/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { ToastController } from '@ionic/angular';
import { UserService } from './user.service';
import { Capacitor } from '@capacitor/core';

const DB_USERS = 'UserDB'

@Injectable()

export class MySqlite {

    platform!: string;
    private dbInitialized: boolean = false;

    sqlitePlugin!: CapacitorSQLitePlugin;
    sqliteConnection!: SQLiteConnection;
    private db!: SQLiteDBConnection;

    constructor(
        public toastController: ToastController,
        private userSvc: UserService
    ) {}

    // Función que inicializa la base de datos

    async initializeDB(): Promise<boolean> {

        if(!this.dbInitialized){
            try{

                this.platform = Capacitor.getPlatform()
            
                this.sqlitePlugin = CapacitorSQLite;
                this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);

                if(this.platform == 'web'){
                    await this.sqliteConnection.initWebStore();
                }

                this.db = await this.sqliteConnection.createConnection(DB_USERS, false, 'no-encryption', 1, false);
                await this.db.open();

                await this.userSvc.createUserTables(this.db);

                if(this.platform == 'web'){
                    await this.sqliteConnection.saveToStore(DB_USERS);
                }

                return true;

            }catch(error){

                console.error('Error al crear la Base de datos:', error);
                return false;
            }
        } else {
            console.log("Database already initialized.");
            return true
        }
    }

    // Devuelve la Base de Datos

    getDB(): Promise<SQLiteDBConnection>{
        if (!this.db) {
            this.initializeDB();
            return this.db;
        }
        return Promise.resolve(this.db);
    }

} 