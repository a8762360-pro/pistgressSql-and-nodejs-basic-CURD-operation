import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.join(process.cwd(), '.env')
})

const config = {
    port : process.env.PORT,
    connection_string : process.env.DATABASE_URL as string,
    JWT_token: process.env.JWT_TOKEN as string
}

export default config;