import config_enrolment from '../configs/db-config-enrolment.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_enrolment);
await client.connect();

export default class EnrolmentRepository {
    
    listParticipants = async (first_name, last_name, username, attended, rating) => {
        let returnArray = null;
        const client = new Client(config_enrolment);
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