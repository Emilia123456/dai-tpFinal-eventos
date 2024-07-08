import { Router } from "express";
import EnrollmentService from '../services/enrollment-service.js'
import EventService from '../services/event-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EnrollmentService();
const eventService = new EventService();

router.get('/:id/enrollment', async (req, res) => { 
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

    let event = await eventService.searchEventById(eventId);
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

        if (event.enabled_for_enrollment === 0) {
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


        const returnEntity = await svc.createRegistration(eventId, userId);
        response = res.status(201).json(returnEntity);
    } catch (error) {
        console.error(error); // Agrega este log para depurar el error interno
        response = res.status(500).json({ error: 'Error interno' });
    }

    return response;
});


router.delete('/:id/enrollment', authMiddleware, async (req, res) => {
    const enrollmentToEliminate = req.params.id;
    const userId = req.user.id;
    
    try {
        const evento = await eventService.searchEventById(enrollmentToEliminate); 
        
        if (!evento) {
            return res.status(404).send('No existe el evento');
        }

        const userReg = await svc.isUserRegistered(evento.id, userId);
        
        if (!userReg) {
            return res.status(401).send('No estás registrado en el evento');
        }

        const now = new Date().toISOString();
        
        if (evento.start_date <= now) {
            return res.status(400).send('El evento ya pasó o es hoy');
        }
        
        if (evento.enabled_for_enrollment <= 0) {
            return res.status(400).send('El evento no se encuentra habilitado para la inscripción');
        }

        const rowsAffected = await svc.deleteEnrollment(enrollmentToEliminate);
        return res.status(200).json(rowsAffected);
        
    } catch (error) {
        return res.status(500).send('Error interno del servidor');
    }
});


router.patch('/:id/enrollment/:rating', authMiddleware, async (req, res) => {
    const eventId = req.params.id;
    const rating = parseInt(req.params.rating, 10);
    const observations = req.body.observations;
    const userId = req.user.id;

    if (!rating || isNaN(rating) || rating < 1 || rating > 10) {
        return res.status(400).send({ error: 'El rating tiene que ser entre el 1 y 10.' });
    }

    try {
        const event = await eventService.searchEventById(eventId);
        if (!event) {
            return res.status(404).send({ error: 'Evento no encontrado' });
        }

        if (new Date(event.start_date) > new Date()) {
            return res.status(400).send({ error: 'El evento no terminó' });
        }

        const isUserRegistered = await svc.isUserRegistered(eventId, userId);
        if (!isUserRegistered) {
            return res.status(400).json({ error: 'El usuario no está registrado en el evento, no puedes ratearlo' });
        }

        const rowsAffected = await svc.rateEvent(eventId, rating, observations);
        if (rowsAffected > 0) {
            return res.status(200).json({ message: 'Rating actualizado correctamente', rowsAffected });
        } else {
            return res.status(400).json({ error: 'No se pudo actualizar el rating' });
        }

    } catch (error) {
        console.error(error); 
        res.status(500).send({ error: 'Error interno' });
    }
});





export default router;

