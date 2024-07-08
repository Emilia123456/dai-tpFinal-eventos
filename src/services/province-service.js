import ProvinceRepository from "../repository/provinces-repository.js";

const repo = new ProvinceRepository();

export default class ProvinceService{
    getAllAsync = async () => {
        const returnArray = await  repo.getAllAsync();
        return returnArray;
    }

    getById = async (id) => {
        console.log('EMILIIIIIIIIIIIIIIIII - getById')
        const returnObject = await repo.getById(id);
        return returnObject;
    }

    insertProvince = async (entity) => {
        const rowCount = await repo.insertProvince(entity);
        return rowCount;
    }

    updateProvince = async (entity) => {
        const rowCount = await repo.updateProvince(entity);
        return rowCount;
    }

    deleteProvince = async (provincia) => {
        const rowCount = await repo.deleteProvince(provincia);
        return rowCount;
    }

    getLocationsByIdProvince = async (id) => {
        const repo = new ProvinceRepository();
        const returnObject = await repo.getLocationsByIdProvince(id);
        return returnObject;
    }

    getEventLocation = async (locationId) => {
        const returnObject = await repo.getEventLocation(locationId);
        return returnObject;
    }
}
    
