import LocationRepository from "../repository/location-repository.js";

export default class LocationService{

    getAllAsync = async () => {
        const repo = new LocationRepository();
        const returnArray = await  repo.getAllAsync();
        return returnArray;
    }

    getById = async (id) => {
        const repo = new LocationRepository();
        const returnObject = await repo.getById(id);
        return returnObject;
    }

    getEventLocation = async (locationId) => {
        const repo = new LocationRepository();
        const returnObject = await repo.getEventLocation(locationId);
        return returnObject;
    }
}