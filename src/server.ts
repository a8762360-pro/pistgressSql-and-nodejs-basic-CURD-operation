import express, {
    Application,
    Request,
    Response
} from "express";
import { Pool } from "pg"
import config from "./config";
const app: Application = express();
const port = 5000;

// middleware
app.use(express.json());
app.use(express.text());

const pool = new Pool({
    connectionString: config.connection_string
})
// console.log(pool)

const intDB = async () => {
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
        console.log("connect database!!")
    } catch (error) {
        console.log(error)
    }
}

intDB();

// get method
app.get("/", (req: Request, res: Response) => {
    // console.log(req)
    res.status(200).json({
        success: true,
        message: "This is root router",
        auther: "PH"
    })
})

// post method
app.post("/api/v1/users", async (req: Request, res: Response) => {

    try {
        const { name, email, age, password } = (req.body);
        const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES($1,$2,$3,$4) RETURNING *`, [ name, email, password, age ]);

        console.log(result.rows[ 0 ]);
        if (result.rowCount === 0) {
            res.status(400).json({
                success: false,
                message: "users not found",
            })
        }

        res.status(200).json({
            success: true,
            message: "users create successfully",
            data: result.rows[ 0 ],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
})

// update matheod
app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, password, age, is_Active } = req.body;
        const result = await pool.query(
            `UPDATE users SET
             name= COALESCE($1, name),
             password= COALESCE($2, password),
             age= COALESCE($3, age),
             is_active = COALESCE($4, is_Active)
             WHERE id=$5 RETURNING *
            `, [ name ?? null, password ?? null, age ?? null, is_Active ?? null, id ]
        )
        if (result.rowCount === 0) {
            res.status(400).json({
                success: false,
                message: "users not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "users updated successfully",
            data: result.rows[ 0 ],
        })
        console.log(result.rows)
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
})

// delete method
app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const result = await pool.query(`
            DELETE FROM users WHERE id=$1`, [ id ]);

        if (result.rowCount === 0) {
            res.status(400).json({
                success: false,
                message: "users not found",
            })
        }
        res.status(200).json({
            success: true,
            message: "users deleted successfully",
            // data: result.rows[ 0 ],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
})

app.listen(config.port, () => {
    console.log(`the server is runnimg on port ${config.port}`)
})

