import config_location from '../configs/db-config-location.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_location);
await client.connect();

export default class LocationRepository {

    getAllAsync = async () =>{
        let returnArray =null;
        const client = new Client(config_location);
        try {
            await client.connect();
            let sql = `SELECT * from locations`; 
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
        const client = new Client(config_location);
        try {
            await client.connect();
            let sql = 'SELECT * from locations WHERE id=$1'; // Array con los valores. 
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
        const client = new Client(config_location);
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


  

export {LocationRepository};
