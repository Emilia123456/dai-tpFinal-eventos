import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    let token = req.headers.authorization;
    let payLoadOriginal = null;
    const secretKey = 'clave$'
    console.log('token Original:', token)
    if (token == null) {
        console.log('token ES NULO!')
        return res.status(401).json({ error: 'Unauthorized' });
    } else {
        try {
            token = token.replace("Bearer ", "");
            console.log('token:', token)
            payLoadOriginal = await jwt.verify(token, secretKey); 
            req.user = payLoadOriginal;
            next();
        } catch(e) {
            console.log('token desencriptado erroneao!')
            return res.status(401).json({ error: 'Unauthorized' });
        }
    }
}

export default authMiddleware;
