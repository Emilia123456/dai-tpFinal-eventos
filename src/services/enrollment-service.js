import EnrollmentRepository from "../repository/enrollment-repository.js";

export default class EnrollmentService{

    create = async (eventId, userId) => {
        let respuesta;
        const repo = new EnrollmentRepository();
        
        await repo.create(eventId, userId);
        return respuesta;
    }
    
    listParticipants = async (first_name, last_name, username, attended, rating) => {
        const repo = new EnrollmentRepository();
        const returnArray = await repo.listParticipants(first_name, last_name, username, attended, rating);
        console.log(returnArray) 
        return returnArray;
    }
}