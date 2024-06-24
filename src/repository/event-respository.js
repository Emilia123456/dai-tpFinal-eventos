import config_event from '../configs/db-config-event.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_event);
await client.connect();

export default class EventRepository {
    
    listEvents = async () =>{
        let returnArray =null;
        const client = new Client(config_event);
        try {
            await client.connect();
            let sql = `SELECT * from events`; 
            let result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }

    searchEvent = async (name, category, tag, startDate) => {
        let returnArray = null;
        const client = new Client(config_event);
        try {
            await client.connect();
            let sql =  `SELECT e.*
                        FROM events e
                        INNER JOIN event_categories ec ON e.id_event_category = ec.id
                        LEFT JOIN event_tags et ON e.id = et.id_event
                        LEFT JOIN tags t ON et.id_tag = t.id 
                        WHERE `; 
    
            if (name!=null){
                sql += `lower(e.name) LIKE lower('%${name}%') AND `; 
            }
            if (category!=null){
                sql += `lower(ec.name) LIKE lower('%${category}%') AND `; 
            }
            if (tag!=null){
                sql += `lower(t.name) LIKE lower('%${tag}%') AND `;
            }
            if (startDate!=null){
                 sql += `e.start_date = '${startDate}' AND `;
             }
    
            // Sacamos el and del final
            if (sql.endsWith('AND ')) {
                sql = sql.slice(0, -4); 
            }
    
            let result = await client.query(sql);
            returnArray = result.rows;
    
        } catch (error){
            console.log(error);
        } finally {
            await client.end();
        }
        console.log(returnArray)
        return returnArray;
    };

    searchEventById = async (id) => {
        let returnObject = null;
        const client = new Client(config_event);
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
    

    insertEvent = async (entity) =>{ //necesita autenticacion
        let returnArray = null;
        const client = new Client(config_event);
        try {
            await client.connect();
            let sql = `INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user )            
            VALUES                
                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`; // Array con los valores.

                const values = [
                    entity.name,
                    entity.description,
                    entity.id_event_category,
                    entity.id_event_location,
                    entity.start_date,
                    entity.duration_in_minutes,
                    entity.price,
                    entity.enabled_for_enrollment ? 1 : 0, 
                    entity.max_assistance,
                    entity.id_creator_user
                ];
        
            
            const result = await client.query(sql, values); 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }
    

    updateEvent = async (entity) =>{//necesita autenticacion
        let returnArray =null;
        const client = new Client(config_event);
        try {
            await client.connect();
            let sql = `UPDATE events SET name=$2, description=$3, id_event_category=$4, id_event_location=$5, start_date=$6, duration_in_minutes=$7, price=$8, enabled_for_enrollment=$9, max_assistance=$10, id_creator_user=$11 WHERE id=$1`; 
        
                const values = [
                    entity.id,
                    entity.name,
                    entity.description, 
                    entity.id_event_category, 
                    entity.id_event_location, 
                    entity.start_date, 
                    entity.duration_in_minutes, 
                    entity.price, 
                    entity.enabled_for_enrollment, 
                    entity.max_assistance, 
                    entity.id_creator_user
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

    deleteEvent = async (eventToEliminate) =>{//necesita autenticacion
        let returnValue =0;
        const client = new Client(config_event);
        
        try {
            await client.connect();
            let sql = 'DELETE from events WHERE id=$1'; // Array con los valores. 
            const values = [eventToEliminate];

            const output = await client.query(sql, values); 
            return output.rowCount;
            
        } catch (error){
            console.log('error', error);
        }
        return returnValue;
    }
}

export {EventRepository};