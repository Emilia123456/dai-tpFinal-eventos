import { Router } from "express";
import EventService from '../services/event-service.js'
const router = Router();
const svc = new EventService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray =await svc.getAllAsync();
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    //console.log(respuesta) ANDA
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

router.get('/:name', async (req, res) => {
    let respuesta;
    let name = req.params.name;
    const returnEntity =await svc.getByName(name);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});
// api/events?category=reci&first_name=emi
// api/events?last_name=pipa&attendeded=1%djfhas
router.get('/:category', async (req, res) => {
    let respuesta;
    let category = req.query.category;
    const returnEntity =await svc.getByCategory(category);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.get('/:startDate', async (req, res) => {
    let respuesta;
    let startDate = req.params.startDate;
    const returnEntity =await svc.getByStartDate(startDate);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.get('/:tag', async (req, res) => {
    let respuesta;
    let tag = req.params.tag;
    const returnEntity =await svc.getByTag(tag);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let response;
    const dataEvent = req.body
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