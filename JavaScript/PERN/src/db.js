import { Pool } from "pg";

export const pool = new pg.Pool({
    port : 5432,
    host : "localhost",
    user : "postgress",
    password : "admin",
});

pool.on("connect",() => {
    console.log("Conectado a la base de datos")
})