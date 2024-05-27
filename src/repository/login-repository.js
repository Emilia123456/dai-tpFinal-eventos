
import config_login from '../configs/db-config-login.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_login);
await client.connect();

export default class LoginRepository {
    getById = async (username, password) =>{
        let returnObject = null;
        const client = new Client(config_login);
        try {
            await client.connect();
            let sql = 'SELECT * from users WHERE username=$1 AND password=$2'; // Array con los valores. 
            const values = [username, password]; 
            let result = await client.query(sql, values); 
            if(result.rows.length > 0){
                returnObject = result.rows[0];
            }else{
                console.log('error', error);
            }
            await client.end();
            return returnObject;
        } catch (error){
            console.log(error);
        }
        return returnObject;
    }
}


  

export {LoginRepository};
