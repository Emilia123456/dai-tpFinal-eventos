import EnrolmentRepository from "../repository/enrolment-repository.js";

export default class EnrolmentService{

    listParticipants = async (first_name, last_name, username, attended, rating) => {
        const repo = new EnrolmentRepository();
        const returnArray = await repo.listParticipants(first_name, last_name, username, attended, rating);
        console.log(returnArray) 
        return returnArray;
    }
}