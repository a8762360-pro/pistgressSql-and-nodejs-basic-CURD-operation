import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();
// post method
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id",userController.getSingleUser);
router.put("/:id", userController.updateUser)
router.delete("/:id",userController.deleteUser )


export const useRoute = router; 
