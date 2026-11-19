import { Router } from "express";
import { profileController } from "./profile.controller";

const routet = Router();

routet.post("/", profileController.createProfile)

export const profileRoutes = routet; 