import express from "express"
import userController from "../controller/userController"

const router = express.Router();

router.post('/signUp',userController.signUp);
router.get('/getAllUsers',userController.getAllUsers);
router.post('/login',userController.login);
router.post('/sendMail',userController.sendMail);

export default router;