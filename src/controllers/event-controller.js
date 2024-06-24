import { Router } from "express";
import EventService from '../services/event-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EventService();

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

router.post('', authMiddleware, async (req, res) => {
    let response;
    const dataEvent = req.body
    dataEvent.id_user_creator = req.user.id
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
    const returnEntity = await svc.getById(eventToEliminate); 
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