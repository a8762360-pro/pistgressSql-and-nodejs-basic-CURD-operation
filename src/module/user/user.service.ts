import { pool } from "../../db";
import { IUser, updateUser } from "./user.interface";
import bcrypt from "bcryptjs";


const createUserIntDB = async (PayLoad: IUser) => {
    const { name, email, age, password } = PayLoad;
    const hasPassword = await bcrypt.hash(password,10)
    console.log(hasPassword)
    const result = await pool.query(`
        INSERT INTO users (name, email, password, age)
        VALUES($1,$2,$3,$4) RETURNING *`, [ name, email, hasPassword, age ]);
        delete result.rows[0].password;
    return result;
}


const getAllUsersFromDB = async () => {
    const result = await pool.query(`
        SELECT * FROM users`);
    return result;
}

const getSingleUserFromDB = async (id: string) => {
    console.log(id)
    const result = await pool.query(`
        SELECT * FROM users WHERE id=$1`, [ id ]);
    return result;
}

const updateSingleUserDataFromDB = async (payLoad: updateUser, id: string) => {
    const { name, password, age, is_Active } = payLoad;
    const result = await pool.query(
        `UPDATE users SET
         name= COALESCE($1, name),
         password= COALESCE($2, password),
         age= COALESCE($3, age),
         is_active = COALESCE($4, is_active)
         WHERE id=$5 RETURNING *
        `, [ name ?? null, password ?? null, age ?? null, is_Active ?? null, id ]
    )
    return result;
}


const deleteUserFromDB = async (id: string) => {
    const result = await pool.query(`
        DELETE FROM users WHERE id=$1`, [ id ]);
    return result;
}

export const userServices = {
    createUserIntDB, getAllUsersFromDB,
    getSingleUserFromDB, updateSingleUserDataFromDB,
    deleteUserFromDB
}