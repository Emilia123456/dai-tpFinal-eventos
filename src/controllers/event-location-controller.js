import { Router } from "express";
import EventLocationService from '../services/event-location-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EventLocationService();

router.get('', authMiddleware, async (req, res) => {
    let respuesta;

    const returnArray = await svc.getAll();
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.get('/:id', authMiddleware, async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity =await svc.getAllById(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;


});

router.post('', authMiddleware, async (req, res) => {
    let response;
    const dataEvent = req.body;
    dataEvent.id_creator_user = req.user.id;
    try {
        if (dataEvent.name.length < 3 || dataEvent.full_address.length < 3) {
            return res.status(400).json({ error: "El campo 'nombre' o 'full_address' debe tener al menos 3 caracteres." });
        } else if (!dataEvent.id_location) {
            return res.status(400).json({ error: "El campo 'id_location' es nulo" });
        } else if (dataEvent.max_capacity < 0) {
            return res.status(400).json({ error: "La capacidad maxima ingresada no es valida" });
        }
        
        const returnArray = await svc.insertEventLocation(dataEvent);
        console.log(returnArray + "controller")
        
        if (returnArray != null) {
            response = res.status(201).json(returnArray);
        } else {
            response = res.status(500).json({ error: "Algo raro paso aca!! //es nulo" });
        }
    } catch (error) {
        response = res.status(400).send(`Error interno`);
    }
    return response;
});

router.put('', authMiddleware, async (req, res) => {
    let response;
    const dataEvent = req.body;
    dataEvent.id_user_creator = req.user.id;
    try {
        if (dataEvent.name.length < 3 || dataEvent.full_address.length < 3) {
            return res.status(400).json({ error: "El campo 'nombre' o 'full_address' debe tener al menos 3 caracteres." });
        } else if (!dataEvent.id_location) {
            return res.status(400).json({ error: "El campo 'id_location' es nulo" });
        } else if (dataEvent.max_capacity < 0) {
            return res.status(400).json({ error: "La capacidad maxima ingresada no es valida" });
        }
        const returnEntity = await svc.updateEventLocation(dataEvent);

        if (returnEntity != null) {
            response = res.status(200).json(returnEntity);
        } else {
            response = res.status(500).json({ error: "Algo raro paso aca!!" });
        }
    } catch (error) {
        response = res.status(400).send(`Error interno`);
    }
    return response;
});


router.delete('/:id', authMiddleware, async (req, res) => {
    let response;
    const eventToEliminate = req.params.id;
    const returnEntity = await svc.getAllById(eventToEliminate); 

    if (returnEntity != null){
        const rowsAffected = await svc.deleteEvent(eventToEliminate);
        if(rowsAffected>0){
            response = res.status(200).json(rowsAffected);
        }
    }else{
        response=res.status(404).send(`not found`);
    }

    return response;
});


export default router;