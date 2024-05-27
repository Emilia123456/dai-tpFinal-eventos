import jwt from 'jsonwebtoken'
import { Router } from "express";
import UserService from '../services/user-service.js'
const router = Router();
const svc = new UserService();

router.post('/login', async (req, res) => {
    let response;
    const userData = req.body
    console.log('controller login' , userData);
    const returnEntity = await svc.loginUser(userData)
    console.log('controller despues del login' , returnEntity);
    if (returnEntity !=null){
        const secretKey = 'clave$'

        const options = {
            expiresIn: '1h',
            issuer: 'ORT ' 
        };

        const token = jwt.sign(returnEntity, secretKey, options);


        response = res.status(200).json({
            "success": true,
            "message": "",
            "token"  : token
         });
    } else {
        response=res.status(401).send({
            "success": false,
            "message": "Usuario o clave inválida.",
            "token"  : ""
         });
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

router.post('/register', async (req, res) => { //no funciona i
    let response;
    const userData = req.body
    console.log('Controller', userData);
    
    
    try{
        if (!userData.first_name || userData.first_name.length < 3) {
            return res.status(400).json({ error: "El campo 'Nombre' debe tener al menos 3 caracteres." });
        } else if (!userData.last_name || userData.last_name.length < 3){
            return res.status(400).json({ error: "El campo 'Apellido' debe tener al menos 3 caracteres." });
        }else if (!userData.password || userData.password.length < 3){
            return res.status(400).json({ error: "El campo 'Contraseña' debe tener al menos 3 caracteres." }); 
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userData.username || emailRegex==(userData.username)) {
            return res.status(400).json({ error: "El campo 'Username' debe ser un correo electrónico válido." });
         }
        const returnValue = await svc.insertUser(userData)
        if(returnValue!=null){
            response = res.status(201).json(returnValue);
            
        } else {
            response  = res.status(500).json({ error: "Algo raro paso aca!!" }); 
        }
        
        // "emigmail"
        

    }catch{
        
        response=res.status(400).send(`Error interno`);
        return response;
    }

    
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

