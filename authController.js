import User from "./models/User.js";
import Role from "./models/Role.js";
import bcrypt from "bcryptjs";
import {validationResult} from "express-validator";
import jwt from "jsonwebtoken";
import 'dotenv/config';

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, process.env.SECRET, {expiresIn: "24h"});           // в пунирируем ключ в обьект опций добавляем время жизни ключа
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Registration error!", errors})
      }
      const {userName, password} = req.body;
      const candidate = await User.findOne({userName});
      if (candidate) {
        return res.status(400).json({message: "This User already exists!!!"});
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: "USER"});
      const user = new User({userName, password: hashPassword, roles: [userRole.value]});
      await user.save();
      return res.status(200).json({message: "User successfully registered"});
    } catch (e) {
      // throw new Error("Помилка регістрації")/
      console.log(e);
      res.status(400).json({message: "Registration error"});
    }
  }

  async login(req, res) {
    try {
      const {userName, password} = req.body;
      const user = await User.findOne({userName});
      if (!user) {
        return res.status(400).json({message: `User with username: ${userName} not found`});
      }
      const validPassword = bcrypt.compareSync(password, user.password);                          //сравниваем пароли у пользователя и у того что в базе данных
      if (!validPassword) {
        return res.status(400).json({message: `Enter wrong password`});
      }
      const token = generateAccessToken(user._id, user.roles);
      return res.status(200).json({token});

    } catch (e) {
      // throw new Error("Помилка    логіну")
      console.log(e);
      res.status(400).json({message: "Login error"});
    }
  }

  async getUsers(req, res) {
    try {
      // const userRole = new Role();
      // const adminRole = new Role({value: "ADMIN"});
      // await userRole.save();
      // await adminRole.save();                       //код для создания Ролей в базе данных, после создания этот код можно удалить


      res.json("server worked!!!!!")
    } catch (e) {
      throw new Error("Помилка отримання користувача")
    }
  }
}

export default new AuthController();