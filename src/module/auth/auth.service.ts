import bcrypt from "bcryptjs";
import { pool } from "../../db";
import { loginInterface } from "./login.interface";
import jwt from "jsonwebtoken";
import config from "../../config";


const loginUserIntoDB = async (payLoad: loginInterface) => {
    // chect if the user exist db   done
    // chect if the pass match      done
    // chect the user status          done
    // if pass all then genarate jwt token
    const { email, password } = payLoad;
    const user = await pool.query(
        `SELECT * FROM users WHERE email=$1`,[email]
    );
    // console.log(user.rows[0])

    if(user.rowCount === 0){
        throw new Error("Invalid credential")
    }

    const matchPassword = await bcrypt.compare(password, user.rows[0].password);

    if(!matchPassword){
        throw new Error("password not matching")
    }

    if(!user.rows[0].is_active){
        throw new Error("your account is blocked")
    }

    const jwtPayload = {
        id : user.rows[0].id,
        name :  user.rows[0].name,
        email :  user.rows[0].email,
        status :  user.rows[0].is_active
    }

    const accessToken = jwt.sign(jwtPayload,config.JWT_token,{expiresIn: "1d"});

    return {accessToken, user : user.rows[0]};
} 

export const authService = {
    loginUserIntoDB
}