import LoginRepository from "../repository/login-repository.js";

export default class UserService{

    getById = async (username, password) => {
        const repo = new LoginRepository();
        const returnObject = await repo.getById(id);
        return returnObject;
    }

}