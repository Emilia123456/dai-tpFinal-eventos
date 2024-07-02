import jwt from 'jsonwebtoken';

async function undoToken(token) {
    const secretKey = 'clave$'
    try {
        return await jwt.verify(token, secretKey);
    } catch (error) {
        return 'Error en la conversión';
    }
}

function removeBearerFromToken(token) {
    return token.replace("Bearer ", "");
}

function authMiddleware(req, res, next) {
    let authHeader = req.headers.authorization;
    if (!authHeader) {
        res.status(401).send([{ success: false, message: 'Es necesario un token' }]);
    } else {
        authHeader = removeBearerFromToken(authHeader);
        undoToken(authHeader)
            .then((decodedToken) => {
                req.user = decodedToken;
                console.log('decodedToken', decodedToken);
                next();
            })
            .catch((error) => {
                res.status(401).send([{ success: false, message: 'Token inválido' }]);
            });
    }
}


export default authMiddleware;






// import jwt from 'jsonwebtoken';

// async function undoToken(token) {
    
//     const secretKey = 'clave$'
//     try {
//         return await jwt.verify(token, secretKey);
//     } catch (error) {
//         return 'Error en la conversión';
//     }
// }

// function removeBearerFromToken(token) {
//     return token.replace("Bearer ", "");
// }

// function authMiddleware(req, res, next) {
//     let authHeader = req.headers.authorization;
//     if (!authHeader) {
//         res.status(401).send([{ success: false, message: 'Es necesario un token' }]);
//     } else {
//         authHeader = removeBearerFromToken(authHeader);
//         undoToken(authHeader)
//             .then((decodedToken) => {
//                 req.user = decodedToken;
//                 console.log('decodedToken', decodedToken);
//                 next();
//             })
//             .catch((error) => {
//                 res.status(401).send([{ success: false, message: 'Token inválido' }]);
//             });
//     }
// }

// export default authMiddleware;

