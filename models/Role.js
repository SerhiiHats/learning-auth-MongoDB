import {Schema, model} from "mongoose";

const Role = new Schema({
  value: {type: String, unique: true, default: "USER"},
});

export default model('Role', Role);                    // експортуем Модель , першим параметром назва Моделі,