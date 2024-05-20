import jwt from 'jsonwebtoken'
import { Router } from "express";
import UserService from '../services/user-service.js'
const router = Router();
const svc = new UserService();

const payLoad ={
    id: 123,
    username: 'pipa'
};

const secretKey = 'clave$'

const options = {
    expiresIn: '1h',
    issuer: 'mi_organizacion'
};

const token = jwt.sign(payLoad, secretKey, options);
console.log(token);

router.post('', async (req, res) => {
    let response;
    const userData = req.body
    const returnEntity = await svc.loginUser(userData)
    try{
        returnEntity!=null
        response = res.status(200).json(returnEntity);
    }catch{
        response=res.status(401).send(`Unauthorized`);
    }
    return response;
})

router.get('', async (req, res) => {
    let respuesta;
    const returnArray =await svc.getAllAsync();
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity =await svc.getById(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let response;
    const userData = req.body
    const returnEntity = await svc.insertUser(userData)
    try{
        returnEntity!=null
        response = res.status(201).json(returnEntity);
    }catch{
        response=res.status(500).send(`Error interno`);
    }
    return response;
});

router.put('', async (req, res) => {
    let response;
    const userData = req.body
    const returnEntity =await svc.updateUser(userData);
    if(returnEntity!=null){
        response = res.status(200).json(returnEntity);
    }else{
        response=res.status(500).send(`Error interno`);
    }
    return response;
});

router.delete('/:id', async (req, res) => {
    let response;
    const userToEliminate = req.params.id;
    const returnEntity = await svc.getById(userToEliminate); 
    if (returnEntity != null){
        const rowsAffected =await svc.deleteUser(userToEliminate);
        response = res.status(200).json(rowsAffected);
    }else{
        response=res.status(404).send(`not found`);
    }
    return response;
});


export default router;

