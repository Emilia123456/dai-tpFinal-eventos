import EnrollmentRepository from "../repository/enrollment-repository.js";

export default class EnrollmentService{

        constructor() {
            this.repo = new EnrollmentRepository;
        }

        listParticipants = async (entity) => {
            const repo = new EnrollmentRepository();
            const returnArray = await repo.listParticipants(entity);
            console.log(returnArray) 
            return returnArray;
        }

        async getEventById(eventId) {
            const repo = new EnrollmentRepository();
            const returnArray = await repo.getEventById(eventId);
            console.log(returnArray) 
            return returnArray;
        }
    
        async getRegistrationsCount(eventId) {
            const repo = new EnrollmentRepository();
            const returnArray = await repo.getRegistrationsCount(eventId);
            console.log(returnArray) 
            return returnArray;
        }
    
        async isUserRegistered(eventId, userId) {
            const repo = new EnrollmentRepository();
            const returnArray = await repo.isUserRegistered(eventId, userId);
            console.log(returnArray) 
            return returnArray;
        }

        async  createRegistration(eventId, userId) {
            const repo = new EnrollmentRepository();
            const returnArray = await repo.createRegistration(eventId, userId);
            console.log(returnArray) 
            return returnArray;
        }

        async deleteEnrollment(eventToEliminate) {
            const repo = new EnrollmentRepository();
            const returnArray = await repo.deleteEnrollment(eventToEliminate);
            console.log(returnArray) 
            return returnArray;
        }
    }
    