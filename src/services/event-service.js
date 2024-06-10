import EventRepository from "../repository/event-respository.js";

export default class EventService{

    searchEvent = async (name, category, tag, startDate) => {
        const repo = new EventRepository();
        const returnArray = await repo.searchEvent(name, category, tag, startDate);
        console.log(returnArray) 
        return returnArray;
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