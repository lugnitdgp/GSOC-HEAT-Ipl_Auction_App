import express from "express";
const router = express.Router();
import {
    createUser,
    authUser,
    getUser
    
} from "../controllers/userControllers.js";
import { protect } from "../middlewares/authmiddleware.js";
import {
    playerController,
    playerUpdater,
    addPlayer,
    getPlayer
} from "../controllers/playerController.js";

// router.get("/", (req, res) => {
//     res.send("hey");
// });
router.post("/signup", createUser);
router.post("/login", authUser);
router.get("/mainpage/:val", playerController);
router.put("/mainpage", playerUpdater);
router.post("/mainpage/addplayer", addPlayer);
router.get("/user/:id", getUser);
//router.get("/playersBought/:id", getPlayers);
router.get("/getPlayer/:id",getPlayer);
//router.put("/mainpage/updtime",updateTime);

export default router;
