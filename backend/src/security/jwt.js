const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const jwtSecret = process.env.jwt_Secret;

const jwtMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    console.log(req.headers);
    
    if (!authHeader) return res.status(401).json({error: "Unauthorized MISSING HEADER"});
    const token = authHeader.split(" ")[1];
    // Si no hubiera token, respondemos con un 401
    if (!token) return res.status(401).json({error: "Unauthorized"});
  
    let tokenPayload;
  
    try {
      tokenPayload = jwt.verify(token, jwtSecret);
    } catch (error) {
      return res.status(401).json({error: "Unauthorized"});
    }
  
    // Guardamos los datos del token dentro de req.jwtPayload
    req.jwtPayload = tokenPayload;
    console.log(tokenPayload);
    next();
  };
  


module.exports = {
    jwtMiddleware
}