import { Router } from "express";
import EnrollmentService from '../services/enrollment-service.js'
import EventService from '../services/event-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EnrollmentService();
const eventService = new EventService();

router.get('/:id/enrollment', async (req, res) => { //hola no funciona, se nos rompio todo no le gusto el id 
    let respuesta;
    let first_name = req.query.first_name;
    let last_name = req.query.last_name;
    let username = req.query.username;
    let attended = req.query.attended;
    let rating = req.query.rating;

    const returnArray = await svc.listParticipants(first_name, last_name, username, attended, rating);
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

// 2024-06-24T08:21:00.000

router.post('/:id/enrollment', authMiddleware, async (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;
    let response;
    console.log('eventId:', eventId)
    console.log('userId:', userId)

    let event = eventService.searchEventById(eventId);
    try {


        //const event = await svc.create(eventId, userId);
        if (event == null) {
            console.log("el evento es nulo")
            return res.status(404).json({ error: 'Evento no encontrado' });
        }
        const currentDate = new Date().toISOString();
        const eventDate = new Date(event.start_date);
        if (eventDate <= currentDate) { 
            console.log("el evento ya pasó")
            return res.status(400).json({ error: 'No se puede registrar a un evento que ya sucedió o es hoy' });
           
        }

        if (!event.enabled_for_enrollment) {
            console.log("el evento no se puede")
            return res.status(400).json({ error: 'El evento no está habilitado para la inscripción' });
        }

        const currentRegistrations = await svc.getRegistrationsCount(eventId);
        if (currentRegistrations >= event.max_assistance) {
            return res.status(400).json({ error: 'Capacidad máxima de registrados excedida' });
        }

        const isUserRegistered = await svc.isUserRegistered(eventId, userId);
        if (isUserRegistered) {
            return res.status(400).json({ error: 'El usuario ya está registrado en el evento' });
        }


        const returnEntity = await svc.create(eventId, userId);
        response = res.status(201).json(returnEntity);
    } catch (error) {
        console.error(error); // Agrega este log para depurar el error interno
        response = res.status(500).json({ error: 'Error interno' });
    }

    return response;
});



export default router;
