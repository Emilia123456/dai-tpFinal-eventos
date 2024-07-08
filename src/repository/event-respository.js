import config_event from '../configs/db-config-event.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_event);
await client.connect();

export default class EventRepository {
    
    /* listEvents = async () =>{
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
        //console.log(returnArray)
        return returnArray;
    } */

    searchEvent = async (name, category, tag, startdate) => {
        let returnArray = null;
        const client = new Client(config_event);
        try {
            await client.connect();
            let sql =  `SELECT 
            e.id, 
            e.name, 
            e.description, 
            e.id_event_category,
            json_build_object( 
                'id',            ec.id, 
                'name',          ec.name, 
                'display_order', ec.display_order
            ) AS ec,
            e.id_event_location,
            json_build_object(
                'id',            el.id, 
                'id_location',   el.id_location, 
                'location',      json_build_object(
                    'id',            l.id,
                    'name',          l.name,
                    'id_province',   l.id_province,
                    'province',      json_build_object(
                        'id',            pr.id,
                        'name',          pr.name,
                        'full_name',     pr.full_name,
                        'latitude',      pr.latitude, 
                        'longitude',     pr.longitude,
                        'display_order', pr.display_order
                    ),
                    'latitude',      l.latitude,
                    'longitude',     l.longitude
                ),
                'name',           el.name,
                'full_address',   el.full_address,
                'max_capacity',   el.max_capacity,
                'latitude',       el.latitude, 
                'longitude',      el.longitude,
                'id_creator_user',el.id_creator_user
            ) AS el,
            e.start_date, 
            e.duration_in_minutes, 
            e.price, 
            e.enabled_for_enrollment, 
            e.max_assistance, 
            e.id_creator_user,
            json_build_object(
                'id',            u.id,
                'first_name',    u.first_name,
                'last_name',     u.last_name,
                'username',      u.username,
                'password',      u.password
            ) AS creator_user,
            ARRAY(
                SELECT 
                    json_build_object(
                        'id',   t.id,
                        'name', t.name
                    ) 
                FROM tags t 
                INNER JOIN event_tags et ON t.id = et.id_tag
                WHERE et.id_event = e.id
            ) AS t
        FROM public.events e
        LEFT JOIN public.event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN public.event_locations el ON e.id_event_location = el.id
        LEFT JOIN public.locations l ON el.id_location = l.id
        LEFT JOIN public.provinces pr ON l.id_province = pr.id
        LEFT JOIN public.users u ON e.id_creator_user = u.id
        WHERE 1=1
        `; 
    
            if (name!=null){
                sql += `AND lower(e.name) LIKE lower('%${name}%') `; 
            }
            if (category!=null){
                sql += `AND lower(ec.name) LIKE lower('%${category}%') `; 
            }
            if (tag!=null){
                sql += `AND lower(t.name) LIKE lower('%${tag}%') `;
            }
            if (startdate!=null){
                 sql += `AND e.start_date = '${startdate}' `;
             }
    
            // Sacamos el and del final
            
            let result = await client.query(sql);
            returnArray = result.rows;
    
        } catch (error){
            console.log(error);
        } finally {
            await client.end();
        }
        //console.log(returnArray)
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
                console.log('SI HAY ROWS')
            }else {
                console.log('NO HAY ROWS')
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