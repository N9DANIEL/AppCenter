import pg from 'pg';
const {Pool} = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'Aa123456',
    port: 5432,
})

pool.on('connect', connection => {
    console.log("new connection!");
})

export {pool};
