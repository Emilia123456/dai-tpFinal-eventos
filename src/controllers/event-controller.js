import { Router } from "express";
import EventService from '../services/event-service.js'
import EventLocationService from '../services/event-location-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EventService();
const locationService = new EventLocationService();

/*
router.get('', async (req, res) => {
    let respuesta;
    const returnEntity = await svc.listEvents();
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});
*/
router.get('', async (req, res) => {
    let respuesta;
    let name = req.query.name;
    let category = req.query.category;
    let tag = req.query.tag;
    let startdate = req.query.startdate

    const returnArray = await svc.searchEvent(name, category, tag, startdate);
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.get('/:id', async (req, res) => {
    console.log('GET BY ID Evento')
    let respuesta;
    let id = req.params.id;
    const returnEntity =await svc.searchEventById(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.post('', authMiddleware, async (req, res) => { //NO FUNCIONA
    let response;
    const dataEvent = req.body
    dataEvent.id_user_creator = req.user.id
    if(dataEvent.name.lenght<3 || dataEvent.description.lenght<3){
        response = res.status(400).json('tiene que ser mayor a tres caracteres el nombre y la descripcion');
    }
    const eventLocation = await locationService.getAllById(dataEvent.id_event_location);
    if(dataEvent.max_assistance > eventLocation.max_capacity){
        response = res.status(400).json('el max assistance es mayor al capaccity');
    }else if(dataEvent.price < 0 || dataEvent.duration_in_minutes < 0){
        response = res.status(400).json('el price o duration son menores a cero');
    }
    const returnEntity = await svc.insertEvent(dataEvent)
    try{
        returnEntity!=null
        response = res.status(201).json(returnEntity);
    }catch{
        response=res.status(500).send(`Error interno`);
    }
    return response;
});

router.put('', authMiddleware, async (req, res) => {
    let response;
    const dataEvent = req.body 
    const returnEntity = await svc.updateEvent(dataEvent);
    if(dataEvent.id_creator_user = req.user.id){
   
        if(returnEntity!=null){
            response = res.status(200).json(returnEntity);
        }else{
            response=res.status(500).send(`Error interno`);
        }
        return response;
    }else{
        response=res.status(404).send(`not found`);
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    let response;
    const eventToEliminate = req.params.id;
    const returnEntity = await svc.searchEvent(eventToEliminate); 
    if (returnEntity.id_creator_user = req.user.id){

        if (returnEntity != null){
            const rowsAffected =await svc.deleteEvent(eventToEliminate);
            response = res.status(200).json(rowsAffected);
        }else{
            response=res.status(404).send(`not found`);
        }

    }else{
        response=res.status(404).send(`not found`);
    }

    return response;
});


export default router;