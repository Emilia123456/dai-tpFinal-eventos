//los endpoints

import config_user from '../configs/db-config-user.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_user);
await client.connect();

export default class UserRepository {
    
    getAllAsync = async () =>{
        let returnArray =null;
        const client = new Client(config_user);
        try {
            await client.connect();
            let sql = `SELECT * from users`; 
            let result = await client.query(sql);
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        console.log(returnArray)
        return returnArray;
    }

    getById = async (id) =>{
        let returnObject = null;
        const client = new Client(config_user);
        try {
            await client.connect();
            let sql = 'SELECT * from users WHERE id=$1'; // Array con los valores. 
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

    loginUser = async (entity) =>{
        let returnArray = null;
        const client = new Client(config_user);
        try {
            await client.connect();
            let sql = `INSERT INTO users (username, password)            
            VALUES                
                ($1, $2)`; // Array con los valores.
        
            const values = [entity.username, entity.password]; 
            const result = await client.query(sql, values); 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }

    insertUser = async (entity) =>{
        let returnArray = null;
        const client = new Client(config_user);
        try {
            await client.connect();
            let sql = `INSERT INTO users (first_name, last_name, username, password)            
            VALUES                
                ($1, $2, $3, $4)`; // Array con los valores.
        
            const values = [entity.first_name, entity.last_name,entity.username, entity.password]; 
            const result = await client.query(sql, values); 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }
    

    updateUser = async (entity) =>{
        let returnArray =null;
        const client = new Client(config_user);
        try {
            await client.connect();
            let sql = `UPDATE users SET first_name=$2, last_name=$3, username=$4, password=$5 WHERE id=$1`; 
        
                const values = [
                    entity.id,
                    entity.first_name,
                    entity.last_name,
                    entity.username,
                    entity.password,
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

    deleteUser = async (usersToEliminate) =>{
        let returnValue =0;
        const client = new Client(config_user);
        
        try {
            await client.connect();
            let sql = 'DELETE from users WHERE id=$1'; // Array con los valores. 
            const values = [usersToEliminate];

            const output = await client.query(sql, values); 
            return output.rowCount;
            
        } catch (error){
            console.log('error', error);
        }
        return returnValue;
    }
}


  

export {UserRepository};
