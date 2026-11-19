import { Request, Response } from "express";
import { pool } from "../../db";
import { userServices } from "./user.service";

const createUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.createUserIntDB(req.body)
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
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsersFromDB();
        res.status(200).json({
            succes: true,
            message: "All users data",
            data: result.rows[0],
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
}


const getSingleUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        console.log(id)
        const result = await userServices.getSingleUserFromDB(id as string)
        if (result.rowCount === 0) {
            res.status(400).json({
                succes: false,
                message: "user not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "this is single user",
            data: result.rows
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error?.message,
            error: error
        })
    }
}


const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
       const result = await userServices.updateSingleUserDataFromDB(req.body, id as string)
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
}


const deleteUser = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
                const result = await userServices.deleteUserFromDB(id as string);
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
    }


export const userController = {
    createUser, getAllUsers, getSingleUser,
     updateUser, deleteUser
}