import mysql from "mysql"
import dotenv from 'dotenv'

dotenv.config()

// Création d'un groupe de connexions pour la base de données MySQL
export const pool = mysql.createPool({
    connectionLimit: process.env.DB_CONNECTION_LIMIT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    socketPath: process.env.DB_SOCKET_PATH,
})

// Vérifier la connexion à la base de données
pool.getConnection((err, connection) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err.message)
  } else {
    console.log("Connecté à la base de données!")
    connection.release() // Libérer la connexion après la vérification
  }
})

// permet d'obtenir le resultat des requetes SQL async
export const asyncQuery = async (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(sql, params, (error, result) => {
      if (error) {
        return reject(error)
      }
      return resolve(result)
    })
  })
}
