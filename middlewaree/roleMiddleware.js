import jwt from "jsonwebtoken";
import 'dotenv/config';

export default function (roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      // "Bearer Adcndsiofn474d.dcdcd" // Токен обычно отправляется в заголовке запроса и имеет вид: указывается слово - Bearer - вид токена, а затем сам токен
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(403).json({message: "User is not authorized"})
      }

      const {roles: userRoles} = jwt.verify(token, process.env.SECRET)
      let hasRole = false;
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true;
        }
      })

      if (!hasRole) {
        return res.status(403).json({message: "You don't have permission to perform this operation"})
      }
      next();
    } catch (e) {
      console.log(e)
      return res.status(403).json({message: "User is not authorized"})
    }

  }

}