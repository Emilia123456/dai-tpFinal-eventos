import config_enrollment from '../configs/db-config-enrollment.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_enrollment);
await client.connect();

export default class EnrollmentRepository {
    
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
    
  
    async eventEnrollment(entity) {
        let returnArray = null;
        const client = new Client(config_enrollment);
        try {
            await client.connect();
            const sql = `UPDATE event_enrollments SET id_event=$1, id_user=$2, description=$3, registration_date_time=$4, attended=$5, observations=$6, rating=$7 WHERE id=$8`; 
            const values = [
                entity.id_event,
                entity.id_user,
                entity.description, 
                entity.registration_date_time, 
                entity.attended, 
                entity.observations, 
                entity.rating,
                entity.id 
            ];  
            const result = await client.query(sql, values);
            returnArray = result.rows;
            await client.end();
        } catch (error) {
            console.error(error); 
        }
        return returnArray;
    }



    listParticipants = async (first_name, last_name, username, attended, rating) => {
        let returnArray = null;
        const client = new Client(config_enrollment);
        try {
            await client.connect();
            let sql =  `SELECT u.* FROM users u
                        INNER JOIN event_enrollments ee ON u.id = ee.id_user
                        inner JOIN events e ON e.id = ee.id_event
                        WHERE `; 
    
            if (first_name!=null){
                sql += `lower(u.first_name) LIKE lower('%${first_name}%') AND `; 
            }
            if (last_name!=null){
                sql += `lower(u.last_name) LIKE lower('%${last_name}%') AND `; 
            }
            if (username!=null){
                sql += `lower(u.username) LIKE lower('%${username}%') AND `;
            }
            if (attended!=null){
                 sql += `ee.attended = '${attended}' AND `;
            }
            if (rating!=null){
                sql += `ee.rating = '${rating}' AND `;
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
}