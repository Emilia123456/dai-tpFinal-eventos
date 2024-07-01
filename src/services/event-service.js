import EventRepository from "../repository/event-respository.js";

export default class EventService{

    listEvents = async () => {
        const repo = new EventRepository();
        const returnArray = await repo.listEvents();
        console.log(returnArray) 
        return returnArray;
    }

    searchEvent = async (name, category, tag, startdate) => {
        const repo = new EventRepository();
        const returnArray = await repo.searchEvent(name, category, tag, startdate);
        //console.log(returnArray) 
        return returnArray;
    }

    searchEventById = async (id) => {
        const repo = new EventRepository();
        const returnArray = await repo.searchEventById(id);
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