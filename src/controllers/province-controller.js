import { Router } from "express";
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc = new ProvinceService();

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
    const returnEntity =await svc.getByIdAsync(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let respuesta;
    const returnEntity =await svc.insertProvince();
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.put('', async (req, res) => {
    let respuesta;
    const returnEntity =await svc.updateProvince();
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.delete('id', async (req, res) => {
    let respuesta;
    const returnArray =await svc.deleteProvince(id);
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});
