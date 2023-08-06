import {Router} from "express";
import authController from "./authController.js";
import {check} from "express-validator";
import authMiddleware from "./middlewaree/authMiddleware.js";

const router = new Router();            // создаем обьект из этого роутера

router.post('/registration', [check('userName', "Login can not be empty").notEmpty(),
    check('password', "Password can not be less than 4 chars and more than 10 chars").isLength({min: 4, max: 10})],
  authController.registration);
router.post('/login', authController.login);
router.get('/users', authMiddleware, authController.getUsers);

export default router;