import { Router } from "express";
import ProvinceService from './../services/province-service.js'
import authMiddleware from "../middlewares/auth-middleware.js";
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
    const returnEntity =await svc.getById(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let respuesta;
    const datosProvincia = req.body
    
    
    if(!datosProvincia.name ||datosProvincia.name.length < 3){
        respuesta = res.status(400).json('bad request el nombre tinene que ser mayor a 3 caracteres');

    } else if (!datosProvincia.latitude || isNaN(datosProvincia.latitude) ){
        respuesta = res.status(400).json('bad request la latitude no son numeros');

    }else if (!datosProvincia.longitude || isNaN(datosProvincia.longitude) ){
        respuesta = res.status(400).json('bad request el longitude no son numeros');
    }

    try{
        console.log("PROVINCE POST try");
        const rowCount = await svc.insertProvince(datosProvincia);
        if(rowCount!=0){
            respuesta = res.status(201).json(rowCount);
        }else{
            respuesta = res.status(500).json(rowCount);
        }
        
    }catch{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.put('', async (req, res) => {
    let respuesta;
    const datosProvincia = req.body

    if(!datosProvincia.name ||datosProvincia.name.length < 3){
        respuesta = res.status(400).json('bad request el nombre tinene que ser mayor a 3 caracteres');

    } else if (!datosProvincia.latitude || isNaN(datosProvincia.latitude) ){
        respuesta = res.status(400).json('bad request la latitude no son numeros');

    }else if (!datosProvincia.longitude || isNaN(datosProvincia.longitude) ){
        respuesta = res.status(400).json('bad request el longitude no son numeros');
    }

    const prov = await svc.getById(datosProvincia.id);

    if(prov!=null){
        const rowCount = await svc.updateProvince(datosProvincia);
        if(rowCount>0){
            respuesta = res.status(200).json(rowCount);
        }
    }else{
        respuesta=res.status(404).send(`No existe`);
    }
    return respuesta;
});

router.delete('/:id', async (req, res) => {
    let respuesta;
    const provAEliminar = req.params.id;
    // VAmos a buscarlo! (provAEliminar)
    const provincia = await svc.getById(provAEliminar); 
    if (provincia != null){
        const rowsAffected = await svc.deleteProvince(provAEliminar);
        if(rowsAffected>0){
            respuesta = res.status(200).json(rowsAffected);
        }
    }else{
        respuesta=res.status(404).send(`not found`);
    }

    return respuesta;
});

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

router.get('/:id/locations', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity =await svc.getLocationsByIdProvince(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.get('/:id/locations', authMiddleware, async (req, res) => {
    let respuesta;
    let locationId = req.params.id;
    const returnEntity =await svc.getEventLocation(locationId);
    
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

export default router;