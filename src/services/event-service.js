import EventRepository from "../repository/event-respository.js";

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

    getByName = async (name) => {
        const repo = new EventRepository();
        const returnObject = await repo.getByName(name);
        return returnObject;
    }

    getByCategory = async (name) => {
        const repo = new EventRepository();
        const returnObject = await repo.getByCategory(name);
        return returnObject;
    }

    getByStartDate = async (startDate) => {
        const repo = new EventRepository();
        const returnObject = await repo.getByStartDate(startDate);
        return returnObject;
    }

    getByTag = async (tag) => {
        const repo = new EventRepository();
        const returnObject = await repo.getByTag(tag);
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