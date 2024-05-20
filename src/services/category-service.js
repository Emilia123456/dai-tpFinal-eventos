import CategoryRepository from "../repository/category-repository.js";

export default class CategoryService{

    getAllAsync = async () => {
        const repo = new CategoryRepository();
        const returnArray = await repo.getAllAsync();
        console.log(returnArray) //ACÁ FALLA
        return returnArray;
    }

    getById = async (id) => {
        const repo = new CategoryRepository();
        const returnObject = await repo.getById(id);
        return returnObject;
    }

    insertCategory = async (entity) => {
        const repo = new CategoryRepository();
        await repo.insertCategory(entity);
    }

    updateCategory = async (entity) => {
        const repo = new CategoryRepository();
        const returnArray = await repo.updateCategory(entity);
        return returnArray;
    }

    deleteCategory = async (categoryToEliminate) => {
        const repo = new CategoryRepository();
        await repo.deleteCategory(categoryToEliminate);
    }
    
}