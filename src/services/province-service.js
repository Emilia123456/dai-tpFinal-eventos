import ProvinceRepository from "../repository/provinces-repository.js";

export default class ProvinceService{

    getAllAsync = async () => {
        const repo = new ProvinceRepository();
        const returnArray = await  repo.getAllAsync();
        return returnArray;
    }

    getById = async (id) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.getById();
        return returnArray;
    }

    insertProvince = async (entity) => {
        const repo = new ProvinceRepository();
        await repo.insertProvince();
    }

    updateProvince = async (entity) => {
        const repo = new ProvinceRepository();
        const returnArray = await repo.updateProvince();
        return returnArray;
    }

    deleteProvince = async (id) => {
        const repo = new ProvinceRepository();
        await repo.deleteProvince();
    }
    
}