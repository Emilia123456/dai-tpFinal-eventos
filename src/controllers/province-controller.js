import { Router } from "express";
import ProvinceService from './../services/province-service.js'
const router = Router();
const svc = new ProvinceService();

router.get('', async (req, res) => {
    let respuesta;
    console.log("Emi")
    const returnArray =await svc.getAllAsync();
    if(returnArray!=null){
        respuesta = res.status(200).json(returnArray);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
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
    let respuesta;
    const datosProvincia = req.body
    console.log(datosProvincia)
    const returnEntity = await svc.insertProvince(datosProvincia);
    
    try{
        returnEntity!=null
        respuesta = res.status(201).json(returnEntity);
    }catch{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.put('', async (req, res) => {
    let respuesta;
    const datosProvincia = req.body
    const returnEntity =await svc.updateProvince(datosProvincia);
    if(returnEntity!=null){
        respuesta = res.status(200).json(returnEntity);
    }else{
        respuesta=res.status(500).send(`Error interno`);
    }
    return respuesta;
});

router.delete('/:id', async (req, res) => {
    let respuesta;
    const provAEliminar = req.params.id;
    // VAmos a buscarlo! (provAEliminar)
    const returnEntity = await svc.getById(provAEliminar); 
    if (returnEntity != null){

        const rowsAffected =await svc.deleteProvince(provAEliminar);
    
        respuesta = res.status(200).json(rowsAffected);
    }else{
        respuesta=res.status(404).send(`not found`);
    }
    
    return respuesta;
});


export default router;