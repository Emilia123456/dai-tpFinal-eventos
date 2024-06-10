import { Express } from "express";
import { Cors } from "cors";
import { Jwt } from "jsonwebtoken";
import { secretKey, token } from "user-controller";

const authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization
    let payLoadOriginal = null;
    
    if (token == null) {
        return res.status(401).json({ error: 'Unauthorized' });
    } else {

        try{
            payLoadOriginal = await jwt.verify(token, secretKey);
            req.user = payLoadOriginal;
            next();
        }catch(e){
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
}