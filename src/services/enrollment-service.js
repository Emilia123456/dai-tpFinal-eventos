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
/* 
        async eventEnrollment(entity) {
            const eventId = entity.id_event;
            const userId = entity.id_user;
    
            const event = await this.repo.getEventById(eventId);
            if (event==null) {
                throw { status: 404, message: 'Evento no encontrado' };
            }
    
            const currentDate = new Date();
            const eventDate = new Date(event.start_date);
            if (eventDate <= currentDate) {
                throw { status: 400, message: 'No se puede registrar a un evento que ya sucedió o es hoy' };
            }
            if (!event.enabled_for_enrollment) {
                throw { status: 400, message: 'El evento no está habilitado para la inscripción' };
            }
    
            const currentRegistrations = await this.repo.getRegistrationsCount(eventId);
            if (currentRegistrations >= event.max_assistance) {
                throw { status: 400, message: 'Capacidad máxima de registrados excedida' };
            }
    
            const isUserRegistered = await this.repo.isUserRegistered(eventId, userId);
            if (isUserRegistered) {
                throw { status: 400, message: 'El usuario ya está registrado en el evento' };
            }
  
            return await this.repo.eventEnrollment(entity);
        }
     */
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
    }
    