const env = require('dotenv').config(".env").parsed



export const ormconfig: any = {
  "type": "mysql",
  "host": "127.0.0.1",
  "port": 3306,
  "username": "root",
  "database": "newProject",
  "synchronize": true,
  "logging": false,
  "entities": ["src/entity/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}


let ormconfigErpSetup: any = { ...ormconfig }

switch (process.env.NODE_ENV) {
  case 'product':
  case 'product-docker':
    console.log('正式主機嚕', env)
    ormconfigErpSetup.name = "Erp";
    ormconfigErpSetup.host = "localhost";
    ormconfigErpSetup.username = "root";
    ormconfigErpSetup.password = "password";
    ormconfigErpSetup.database = "mydb"
    ormconfigErpSetup.entities = ["src/entity/**/*.ts"];
    ormconfigErpSetup.synchronize = true;
    break

  default:
    console.log('開發環境主機', env)
    ormconfigErpSetup.name = "Erp";
    ormconfigErpSetup.host = env.LOCAL_ERP_HOST;
    ormconfigErpSetup.username = env.LOCAL_ERP_USER;
    ormconfigErpSetup.password = env.LOCAL_ERP_PASSWORD;
    ormconfigErpSetup.database = env.LOCAL_ERP_DB
    ormconfigErpSetup.entities = ["src/entity/**/*.ts"];

    ormconfigErpSetup.synchronize = true;

    break
}

export const ormconfigErp = ormconfigErpSetup


