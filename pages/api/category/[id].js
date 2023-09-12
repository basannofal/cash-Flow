// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL parameter

    if (req.method === 'GET') {
        try {
            const q = "SELECT * FROM cf_category WHERE id = ?";
            const [rows] = await conn.query(q, [id]);

            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching category by ID:', error);
            res.status(500).json({ error: 1, msg : "Category Cannot Fetch... Check Connection" });
        }
    } 
    
    
    if(req.method == 'DELETE'){
        try {
            const {id} = req.query
            console.log(id);
            // Query the database
            const q = "DELETE FROM cf_category WHERE id = ?"
            console.log(q);
            const [rows] = await conn.query(q, [id]);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            if(error.toString().includes("Cannot delete or update a parent row")){
                res.status(500).json({ error: 1, msg  : "Category Not Deleted... Already Use In Any Payment" });
            }
            else{
                res.status(500).json({error:1, msg : "Category Cannot Delete... Check Connection"})
            }
        }
    }

    if (req.method == 'PATCH') {
        
        const {categoryName, subcategory} = req.body
        try {
            // Query the database
            const q = "UPDATE cf_category SET `name` = ?, `sub_category` = ? WHERE id = ?"
            console.log(q);
            const data = [
                categoryName,
                subcategory,
                id
            ]
            const [rows] = await conn.query(q, data);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, msg : "Category Cannot Update... Check Connection" });
        }
    } 
    
}
