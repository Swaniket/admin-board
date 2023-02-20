import express from "express";
import { getUser } from "../controllers/general.js";

const router = express.Router();

/* 
    GET: /api/general/users/:id
    DESC: Returns User Profile
    Note: Make it /users/me and get the user ID from auth middleware
*/
router.get("/user/:id", getUser);

export default router;
