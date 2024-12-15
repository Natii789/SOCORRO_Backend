import mysql from 'mysql2/promise';
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
        connectionLimit: 10,
        maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0
    })
    global.poolConexoes = pool;
    return await pool.getConnection();
}

export function liberarConexao(conexao) {
    global.poolConexoes.releaseConnection(conexao);
    conexao.release();
}