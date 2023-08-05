import {Router} from "express";
import authController from "./authController.js";

const router = new Router();            // создаем обьект из этого роутера

router.post('/registration', authController.registration);
router.post('/login', authController.login);
router.get('/users', authController.getUsers);

export default router;