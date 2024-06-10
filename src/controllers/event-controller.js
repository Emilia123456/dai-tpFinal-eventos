import { Router } from "express";
import EventService from '../services/event-service.js'
// importo el middleware
const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    let name = req.query.name;
    let category = req.query.category;
    let tag = req.query.tag;
    let startDate = req.query.startDate

    const returnArray = await svc.searchEvent(name, category, tag, startDate);
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.post('', /*authMiddleware*/ async (req, res) => {
    let response;
    const dataEvent = req.body
    //dataEvent.id_user_creator = aslkdjaslk
    const returnEntity = await svc.insertEvent(dataEvent)
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
    const dataEvent = req.body
    const returnEntity =await svc.updateEvent(dataEvent);
    if(returnEntity!=null){
        response = res.status(200).json(returnEntity);
    }else{
        response=res.status(500).send(`Error interno`);
    }
    return response;
});

router.delete('/:id', async (req, res) => {
    let response;
    const eventToEliminate = req.params.id;
    const returnEntity = await svc.getById(eventToEliminate); 
    if (returnEntity != null){
        const rowsAffected =await svc.deleteEvent(eventToEliminate);
        response = res.status(200).json(rowsAffected);
    }else{
        response=res.status(404).send(`not found`);
    }
    return response;
});


export default router;