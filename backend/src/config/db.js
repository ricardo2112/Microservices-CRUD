const sql = require("mssql");
require("dotenv").config();

const dbConfig = {
  server: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,  // Asegúrate de agregar esto
  password: process.env.DB_PASSWORD,  // Y esto también
  options: {
    encrypt: false, // Debes cambiar a `true` si usas Azure
    enableArithAbort: true,
    trustServerCertificate: true,
  },
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log(`✅ Conectado a SQL Server en ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    return pool;
  })
  .catch((err) => {
    console.error("❌ Error en la conexión a la base de datos:", err);
  });

module.exports = { sql, poolPromise };
