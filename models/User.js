import {Schema, model} from "mongoose";

const User = new Schema({
  userName: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  roles: [{type: String, ref: 'Role'}],
});

export default model('User', User);                    // експортуем Модель , першим параметром назва Моделі, а вторим параметром створена Схема моделі