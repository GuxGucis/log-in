export class UserUpgradeStatements {
    userUpgrades = [
        {
        toVersion: 1,
        statements: [
            `CREATE TABLE IF NOT EXISTS users(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userName TEXT NOT NULL,
            );`
        ]
        },
        /* add new statements below for next database version when required*/
        {
            toVersion: 2,
            statements: [
                `ALTER TABLE users ADD COLUMN userName TEXT;`,
            ]
        },
        /*
        {
        toVersion: 2,
        statements: [
            `ALTER TABLE users ADD COLUMN email TEXT;`,
        ]
        },
        */
    ]
  }