import { Pool } from "pg"
import config from "../config"

export const pool = new Pool({
    connectionString: config.connection_string
})
// console.log(pool)

export const intDB = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY, 
            name varchar(255),
            email varchar(255) UNIQUE NOT NULL,
            password varchar(255) NOT NULL,
            age INT,
            is_active BOOLEAN DEFAULT true,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            );
            `)

        await pool.query(`
            CREATE TABLE IF NOT EXISTS profiles(
            id SERIAL PRIMARY KEY,
            user_id INT UNIQUE REFERENCEs users(id) ON DELETE CASCADE,
            bio TEXT,
            address TEXT,
            phone VARCHAR(15),
            gender VARCHAR(15),
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
            )`)
        console.log("connect database!!")

    } catch (error) {
        console.log(error)
    }
}

