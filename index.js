import 'dotenv/config';
import express from "express";
import mongoose from "mongoose";
import router from "./authRouter.js";


const PORT = process.env.PORT || 5000;

const app = express();               // создадим из этой функции само наше приложение, наш сервер

app.use(express.json());             // устанавливаем функцию будет нашему серверу парсит JSON, что прилетают в запросах
app.use("/auth", router);            // указываем приложению что б оно прослушивало наш роутер

const start = async () => {
  try {
    if (!process.env.MONGO_DB_PASSWORD) {
      throw new Error("You forgot to set MONGO_DB_PASSWORD")
    }
    await mongoose.connect(`mongodb+srv://gatsserv:${process.env.MONGO_DB_PASSWORD}@cluster0.lafhw4q.mongodb.net/?retryWrites=true&w=majority`)   // подключаемся к базе данных
    app.listen(PORT, () => console.log(`Server starter on PORT: ${PORT}`));                 // устанавливаем серверу слушатель событий и передаем колбек функцию
  } catch (e) {
    console.log(e)
  }
}

start();