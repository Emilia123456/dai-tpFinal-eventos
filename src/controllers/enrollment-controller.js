import { Router } from "express";
import EnrollmentService from '../services/enrollment-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EnrollmentService();

router.get(':id/enrollment', async (req, res) => { //hola no funciona, se nos rompio todo no le gusto el id 
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

    try {
        const event = await svc.eventEnrollment(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Evento no encontrado' });
        }

        const currentDate = new Date();
        const eventDate = new Date(event.start_date);
        if (eventDate <= currentDate) {
            return res.status(400).json({ error: 'No se puede registrar a un evento que ya sucedió o es hoy' });
        }

        if (!event.enabled_for_enrollment) {
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

        const dataUser = {
            id_event: eventId,
            id_user: userId,
            description: req.body.description, 
            registration_date_time: new Date(),
            attended: false,
            observations: req.body.observations,
            rating: req.body.rating
        };

        const returnEntity = await svc.eventEnrollment(dataUser);
        response = res.status(201).json(returnEntity);
    } catch (error) {
        console.error(error); // Agrega este log para depurar el error interno
        response = res.status(500).json({ error: 'Error interno' });
    }

    return response;
});



export default router;
