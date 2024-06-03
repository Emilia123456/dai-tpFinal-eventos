import EventRepository from "../repository/event-repository.js";

export default class EventService{

    getAllAsync = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.getAllAsync();
        console.log(returnArray) //ACÁ FALLA
        return returnArray;
    }

    getById = async (id) => {
        const repo = new EventRepository();
        const returnObject = await repo.getById(id);
        return returnObject;
    }

    insertEvent = async (entity) => {
        const repo = new EventRepository();
        await repo.insertEvent(entity);
    }

    updateEvent = async (entity) => {
        const repo = new EventRepository();
        const returnArray = await repo.updateEvent(entity);
        return returnArray;
    }

    deleteEvent = async (eventToEliminate) => {
        const repo = new EventRepository();
        await repo.deleteEvent(eventToEliminate);
    }
    
}