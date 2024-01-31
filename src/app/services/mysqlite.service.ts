import { Injectable, signal } from '@angular/core';
import { CapacitorSQLite, CapacitorSQLitePlugin, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { User } from '../interfaces/user.model';

const DB_USERS = 'UserDB'

@Injectable()

export class MySqlite {

    sqlitePlugin!: CapacitorSQLitePlugin;
    sqliteConnection!: SQLiteConnection;
    private db!: SQLiteDBConnection;
    users!: User[];


    constructor() {}

    async initializeDB() {

        try{
        
            this.sqlitePlugin = CapacitorSQLite;
            this.sqliteConnection = new SQLiteConnection(this.sqlitePlugin);
            await this.sqliteConnection.initWebStore();

            this.db = await this.sqliteConnection.createConnection(DB_USERS, false, 'no-encryption', 1, false);
            
            await this.db.open();

            const script = `
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    userName TEXT NOT NULL
                );
            `;

            await this.db.execute(script);
            this.loadUsers();

            await this.sqliteConnection.saveToStore(DB_USERS);

            return true;

        }catch(error){

            console.error('Error al crear la Base de datos:', error);
            return false;
        }
    }

    getUsers(){
        return this.users;
    }

    async loadUsers() {
        try {
            const result = await this.db.query('SELECT * FROM users;');
            console.log('-', result.values);
            if (result.values) {
                this.users = (result.values as User[]);
            } else {
                this.users = [];
            }
        } catch (error) {
            console.error('Error loading users:', error);
            this.users = [];
        }
    }
    

    async addUser(user: User): Promise<boolean> {
        try {
            console.log('Insertar usuario: ', user)
            await this.db.query(`INSERT INTO users (userName) VALUES (?)`, [user.userName]);
            this.loadUsers();
            return true; // Success in adding the user
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            return false; // Error in adding the user
        }
        
    } 

    // async getUserByUserName(userName: string): Promise<User | null> {
    //     try {
    //         // Prepare the SELECT query to find the user by userName
    //         const query = `SELECT * FROM users WHERE userName = ?`;
    //         const result = await this.db.query(query, [userName]);
    
    //         if (result.values && result.values.length > 0) {
    //             // Assuming the result.values contains user data
    //             // Convert the result to a User object
    //             const user = {
    //                 id: result.values[0].id,
    //                 userName: result.values[0].userName,
    //                 // Include other user fields if available
    //             };
    //             return user;
    //         } else{
    //             // No user found with the given userName
    //             return null;
    //         }
    //     } catch (error) {
    //         console.error('Error al obtener usuario:', error);
    //         return null;
    //     }
    // }

} 