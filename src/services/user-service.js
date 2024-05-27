import UserRepository from "../repository/user-repository.js";

export default class UserService{

    getAllAsync = async () => {
        const repo = new UserRepository();
        const returnArray = await repo.getAllAsync();
        console.log(returnArray) 
        return returnArray;
    }

    getById = async (id) => {
        const repo = new UserRepository();
        const returnObject = await repo.getById(id);
        return returnObject;
    }

    loginUser = async (userData) => {
        const repo = new UserRepository();
        const returnObject = await repo.loginUser(userData);
        return returnObject;
    }

    insertUser = async (entity) => {
        const repo = new UserRepository();
        console.log('Servicio', entity);
        await repo.insertUser(entity);
    }

    updateUser = async (entity) => {
        const repo = new UserRepository();
        const returnArray = await repo.updateUser(entity);
        return returnArray;
    }

    deleteUser = async (categoryToEliminate) => {
        const repo = new UserRepository();
        await repo.deleteUser(categoryToEliminate);
    }
    
}