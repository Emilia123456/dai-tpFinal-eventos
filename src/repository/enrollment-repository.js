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
    

    async getRegistrationsCount(eventId) {
   
        const client = new Client(config_enrollment);
        try {
            await client.connect();
            const sql = 'SELECT COUNT(*) FROM event_enrollments WHERE id_event = $1';
            const values = [eventId];
            const result = await client.query(sql, values);
            await client.end();
            return parseInt(result.rows[0].count, 10);
        } catch (error) {
            console.error('Error en getRegistrationsCount:', error);
            throw error;
        }
    }


    async isUserRegistered(eventId, userId) {
        // Implementación para verificar si el usuario ya está registrado
        const client = new Client(config_enrollment);
        try {
            await client.connect();
            const sql = 'SELECT * FROM event_enrollments WHERE id_event = $1 AND id_user = $2';
            const values = [eventId, userId];
            const result = await client.query(sql, values);
            await client.end();
            return result.rows.length > 0;
        } catch (error) {
            console.error('Error en isUserRegistered:', error);
            throw error;
        }
    }
  
    async create(eventId, userId) {
        let returnArray = null;
        const client = new Client(config_enrollment);
        try {
            await client.connect();
            const sql = `INSERT INTO public.event_enrollments (id_event, id_user, registration_date_time, attended) VALUES ($1, $2, $3, $4)`; 
            const values = [
                eventId,
                userId,
                Date(),
                '0'
            ];  
            const result = await client.query(sql, values);
            returnArray = result.rows;
            await client.end();
        } catch (error) {
            console.error(error); 
            throw error;
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
                        WHERE 1=1 `; 
    
            if (first_name!=null){
                sql += `AND lower(u.first_name) LIKE lower('%${first_name}%') `; 
            }
            if (last_name!=null){
                sql += `AND lower(u.last_name) LIKE lower('%${last_name}%')  `; 
            }
            if (username!=null){
                sql += `AND lower(u.username) LIKE lower('%${username}%') `;
            }
            if (attended!=null){
                 sql += `AND ee.attended = '${attended}' `;
            }
            if (rating!=null){
                sql += `AND  ee.rating = '${rating}' `;
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