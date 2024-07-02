import EventLocationRepository from "../repository/event-location-respository.js";

export default class EventLocationService{

    getAll = async () => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAll();
        return returnArray;
    }

    getAllById = async (id) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.getAllById(id);
        return returnArray;
    }

    insertEventLocation = async (dataEvent) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.insertEvent(dataEvent);
        return returnArray;
    }

    updateEventLocation = async (dataEvent) => {
        const repo = new EventLocationRepository();
        const returnArray = await repo.insertEvent(dataEvent);
        return returnArray;
    }

    deleteEvent = async (eventToEliminate) => {
        const repo = new EventLocationRepository();
        await repo.deleteEvent(eventToEliminate);
    }
    
}