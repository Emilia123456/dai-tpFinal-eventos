import { Router } from "express";
import CategoryService from './../services/category-service.js'
const router = Router();
const svc = new CategoryService();

router.get('', async (req, res) => {
    let respuesta;
    const returnArray =await svc.getAllAsync();
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    //console.log(respuesta) ANDA
    return respuesta;
});

router.get('/:id', async (req, res) => {
    let respuesta;
    let id = req.params.id;
    const returnEntity =await svc.getById(id);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(404).send(`Not Found`);
    }
    return respuesta;
});

router.post('', async (req, res) => {
    let response;
    const dataCategory = req.body
    const returnEntity = await svc.insertCategory(dataCategory)
    try{
        returnEntity!=null
        response = res.status(201).json(returnEntity);
    }catch{
        response=res.status(500).send(`Error interno`);
    }
    return response;
});

router.put('', async (req, res) => {
    let response;
    const dataCategory = req.body
    const returnEntity =await svc.updateCategory(dataCategory);
    if(returnEntity!=null){
        response = res.status(200).json(returnEntity);
    }else{
        response=res.status(500).send(`Error interno`);
    }
    return response;
});

router.delete('/:id', async (req, res) => {
    let response;
    const categoryToEliminate = req.params.id;
    const returnEntity = await svc.getById(categoryToEliminate); 
    if (returnEntity != null){
        const rowsAffected =await svc.deleteCategory(categoryToEliminate);
        response = res.status(200).json(rowsAffected);
    }else{
        response=res.status(404).send(`not found`);
    }
    return response;
});


export default router;