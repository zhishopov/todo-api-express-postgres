import pg from 'pg';

const { Pool } = pg;


export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "todo_db",
    password: "password",
    port: "5432"
});