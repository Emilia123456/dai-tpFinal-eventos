import config_event_location from '../configs/db-config-event-location.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_event_location);
await client.connect();

export default class EventLocationRepository {

    getAll = async () => {
        let returnArray = null;
        const client = new Client(config_event_location);
        try {
            await client.connect();
            let sql = 'SELECT * FROM event_locations';

            let result = await client.query(sql);
            returnArray = result.rows;
    
        } catch (error){
            console.log(error);
        } 
        return returnArray;
    };

    getAllById = async (id) => {
        let returnObject = null;
        const client = new Client(config_event_location);
        try {
            await client.connect();
            let sql = 'SELECT * from events WHERE id=$1'; 
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
    };
    

    insertEventLocation = async (dataEvent) =>{ //necesita autenticacion
        let returnArray = null;
        const client = new Client(config_event_location);
        try {
            await client.connect();
            let sql = `INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude)            
            VALUES ($1, $2, $3, $4, $5, $6)`; // Array con los valores.

                const values = [
                    dataEvent.id_location,
                    dataEvent.name,
                    dataEvent.full_address,
                    dataEvent.max_capacity,
                    dataEvent.latitude,
                    dataEvent.longitude,
                ];
        
            const result = await client.query(sql, values); 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }

    updateEventLocation = async (dataEvent) =>{ //necesita autenticacion
        let returnArray = null;
        const client = new Client(config_event_location);
        try {
            await client.connect();
            let sql = `UPDATE event_locations SET (id_location, name, full_address, max_capacity, latitude, longitude)            
            VALUES ($1, $2, $3, $4, $5, $6 )`; // Array con los valores.

                const values = [
                    dataEvent.id_location,
                    dataEvent.name,
                    dataEvent.full_address,
                    dataEvent.max_capacity,
                    dataEvent.latitude,
                    dataEvent.longitude,
                    
                ];
        
            
            const result = await client.query(sql, values); 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }
    
    deleteEvent = async (eventToEliminate) =>{//necesita autenticacion
        let returnValue = 0;
        const client = new Client(config_event_location);
        
        try {
            await client.connect();
            let sql = 'DELETE from event_locations WHERE id=$1'; // Array con los valores. 
            const values = [eventToEliminate];

            const output = await client.query(sql, values); 
            return output.rowCount;
            
        } catch (error){
            console.log('error', error);
        }
        return returnValue;
    }
}

export {EventLocationRepository};