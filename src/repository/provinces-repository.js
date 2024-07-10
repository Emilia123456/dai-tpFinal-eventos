//los endpoints

import config_provinces from '../configs/db-config-provinces.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_provinces);
await client.connect();

export default class ProvinceRepository {
    
    getAllAsync = async () =>{
        let returnArray =null;
        const client = new Client(config_provinces);
        try {
            await client.connect();
            let sql = `SELECT * from provinces`; 
            let result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }

    getById = async (id) =>{
        let returnObject = null;
        const client = new Client(config_provinces);
        try {
            await client.connect();
            let sql = 'SELECT * from provinces WHERE id=$1';
            const values = [id]; 
            let result = await client.query(sql, values); 
            if(result.rows.length > 0){
                returnObject = result.rows[0];
            }
            await client.end();
        } catch (error){
            console.log(error);
        }
        console.log('returnObject', returnObject)
        return returnObject;
    }

    insertProvince = async (entity) =>{
        let rowCount = 0;
        const client = new Client(config_provinces);
        try {
            await client.connect();
            let sql = `INSERT INTO provinces (name, full_name, latitude, longitude, display_order)            
            VALUES                
                ($1, $2, $3, $4, $5)`; // Array con los valores.
        
            const valores = [entity.name, entity.full_name, entity.latitude, entity.longitude, entity.display_order]; 
            const resultado = await client.query(sql, valores); 
            await client.end();
            rowCount = resultado.rowCount;
        } catch (error){
            console.log(error);
        }
        console.log('rowCount', rowCount);
        return rowCount;
    }
    

    updateProvince = async (entity) =>{
        let returnArray =null;
        const client = new Client(config_provinces);
        try {
            await client.connect();
            let sql = `UPDATE provinces SET name=$2, full_name=$3, latitude=$4, longitude=$5, display_order=$6 WHERE id=$1`; 
        
                const values = [
                    entity.id,
                    entity.name,
                    entity.full_name,
                    entity.latitude,
                    entity.longitude,
                    entity.display_order,
                ];  
                const result = await client.query(sql, values);
                return result.rowCount; 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }

    deleteProvince = async (provAEliminar) =>{
        let respuesta = null;
        const client = new Client(config_provinces);
        try {
            await client.connect();
            //NO FUNCIONA
            let sql = 'DELETE FROM provinces WHERE id = $1';
            console.log("sql", sql)
            const values = [provAEliminar];
            //la clave foranea todavia existe en locations por eso no lo puede eliminar
            respuesta = await client.query(sql, values); 
            await client.end();
            
            return respuesta.rowCount;
            
        } catch (error){
            console.log('error', error);
        }
        return respuesta;
    }

    
    getLocationsByIdProvince = async (id) =>{
        let returnObject = null;
        const client = new Client(config_provinces);
        try {
            await client.connect();
            let sql = 'SELECT * from locations WHERE id_province=$1'; // Array con los valores. 
            const values = [id]; 
            let result = await client.query(sql, values); 
            if(result.rows.length > 0){
                returnObject = result.rows[0];
            }          
            await client.end();
            return returnObject;
            
        } catch (error){
            console.log(error);
        }
        return returnObject;
    }
    

    getEventLocation = async (id) =>{
        let returnObject = null;
        const client = new Client(config_provinces);
        console.log(id)
        try {
            await client.connect();
            let sql = 'SELECT * FROM public.event_locations el INNER JOIN locations l ON l.id = el.id_location WHERE l.id = $1';
            const values = [id]; 
            let result = await client.query(sql, values); 
            if(result.rows.length > 0){
                returnObject = result.rows[0];
            }
                        
            await client.end();
            return returnObject;
            
        } catch (error){
            console.log(error);
        }
        return returnObject;
    }

}


  

export {ProvinceRepository};
