//los endpoints

import config_category from '../configs/db-config-category.js';
import pkg from 'pg' 
const { Client }  = pkg;
const client = new Client(config_category);
await client.connect();

export default class CategoryRepository {
    
    getAllAsync = async () =>{
        let returnArray =null;
        const client = new Client(config_category);
        try {
            await client.connect();
            let sql = `SELECT * from event_categories`; 
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
        const client = new Client(config_category);
        try {
            await client.connect();
            let sql = 'SELECT * from event_categories WHERE id=$1'; // Array con los valores. 
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

    insertCategory = async (entity) =>{
        let returnArray = null;
        const client = new Client(config_category);
        try {
            await client.connect();
            let sql = `INSERT INTO event_categories (name, display_order)            
            VALUES                
                ($1, $2)`; // Array con los valores.
        
            const values = [entity.name, entity.display_order]; 
            const result = await client.query(sql, values); 
            await client.end();
            returnArray = result.rows;
        } catch (error){
            console.log(error);
        }
        return returnArray;
    }
    

    updateCategory = async (entity) =>{
        let returnArray =null;
        const client = new Client(config_category);
        try {
            await client.connect();
            let sql = `UPDATE event_categories SET name=$2, display_order=$3 WHERE id=$1`; 
        
                const values = [
                    entity.id,
                    entity.name,
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

    deleteCategory = async (categoryToEliminate) =>{
        let returnValue =0;
        const client = new Client(config_category);
        
        try {
            await client.connect();
            let sql = 'DELETE from event_categories WHERE id=$1'; // Array con los valores. 
            const values = [categoryToEliminate];

            const output = await client.query(sql, values); 
            return output.rowCount;
            
        } catch (error){
            console.log('error', error);
        }
        return returnValue;
    }
}


  

export {CategoryRepository};
