import { Router } from "express";
import LocationService from './../services/location-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new LocationService();

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

router.get('/:id/event-location', authMiddleware, async (req, res) => {
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