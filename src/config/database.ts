import mysql from 'mysql2/promise';
import 'dotenv/config';

const requiredEnv = (name: string): string => {
    const value = process.env[name];

    if (!value){
        throw new Error(`Missing environment variable: ${name}`)
    }

    return value;
}

const pool = mysql.createPool({
    host: requiredEnv('DB_HOST'),
    port: Number(process.env.DB_PORT),
    user: requiredEnv('DB_USER'),
    password: requiredEnv('DB_PASSWORD'),
    database: requiredEnv('DB_NAME'),
    waitForConnections: true,
    connectionLimit: 10,
});

export default pool