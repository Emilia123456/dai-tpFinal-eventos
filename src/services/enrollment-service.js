import EnrollmentRepository from "../repository/enrollment-repository.js";

export default class EnrolmentService{

    eventEnrollment = async (id) => {
        const repo = new EnrollmentRepository();
        await repo.eventEnrollment(entity);
    }
    
    listParticipants = async (first_name, last_name, username, attended, rating) => {
        const repo = new EnrollmentRepository();
        const returnArray = await repo.listParticipants(first_name, last_name, username, attended, rating);
        console.log(returnArray) 
        return returnArray;
    }
}