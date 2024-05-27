import jwt from 'jsonwebtoken'
import { Router } from "express";
import LoginService from '../services/login-service.js'
const router = Router();
const svc = new LoginService();

const payLoad ={
    id: 123,
    first_name: '',
    last_name:'',
    username: '',
    password: ''
};

const secretKey = 'clave$'

const options = {
    expiresIn: '1h',
    issuer: 'mi_organizacion' //que pongo aca?¡?¡?
};

const token = jwt.sign(payLoad, secretKey, options);
console.log(token);


router.get('/:username/:password', async (req, res) => {
    let respuesta;
    let username = req.params.username;
    let password = req.params.password;
    const returnEntity =await svc.getById(username, password);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
        console.log("hola:",returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

export default router;

