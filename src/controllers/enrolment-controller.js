import { Router } from "express";
import EnrolmentService from '../services/enrolment-service.js'
import authMiddleware from '../middlewares/auth-middleware.js'
const router = Router();
const svc = new EnrolmentService();

router.get('', async (req, res) => {
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


export default router;
