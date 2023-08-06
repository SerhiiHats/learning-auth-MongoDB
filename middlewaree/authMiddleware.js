import jwt from "jsonwebtoken";
import 'dotenv/config';

export default function (req, res, next) {
  if (req.method === "OPTIONS") {
    next()
  }
  try {
    // "Bearer Adcndsiofn474d.dcdcd" // Токен обычно отправляется в заголовке запроса и имеет вид: указывается слово - Bearer - вид токена, а затем сам токен
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(403).json({message: "User is not authorized"})
    }

    const decodedData = jwt.verify(token, process.env.SECRET);    //если токен есть - декодируем токен методом verify куда ложим токен и Сикрет и полочаеи payload {id, roles} user
    req.user = decodedData;
    next();

  } catch (e) {
    console.log(e)
    return res.status(403).json({message: "User is not authorized"})
  }

}