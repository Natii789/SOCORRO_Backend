import mysql from 'mysql2/promise';
import 'dotenv/config';


export default async function conectarBanco() {
    if (global.poolConexoes) {
        return await global.poolConexoes.getConnection();
    }

    const pool = mysql.createPool({
        host: process.env.IP_BANCO_DE_DADOS,
        port: process.env.PORTA_BANCO_DE_DADOS,
        user:process.env.BD_USUARIO,
        password: process.env.BD_SENHA,
        database: process.env.BASE_DE_DADOS,
        waitForConnections: true,
        queueLimit: 20,
        connectTimeout: 60000,

    })
    global.poolConexoes = pool;
    return await pool.getConnection();
}
