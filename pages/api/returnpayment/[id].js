// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL parameter

    if (req.method === 'GET') {
        try {
            const q = "SELECT * FROM cf_main_payment_return WHERE m_id = ?";
            const [rows] = await conn.query(q, [id]);
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching category by ID:', error);
            res.status(500).json({ error: 1 });
        }
    } 
    
    
    if(req.method == 'DELETE'){
        try {
            const {id} = req.query
            console.log(id);
            // Query the database
            const q = "DELETE FROM cf_main_payment_return WHERE id = ?"
            console.log(q);
            const [rows] = await conn.query(q, [id]);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1 });
        }
    }

    if (req.method == 'PATCH') {
        let currentDate = new Date().toJSON().slice(0, 10);
        const { amount, collectedby, mid, bailmid, username} = req.body
        try {
            // Query the database
            const q = "UPDATE `cf_main_payment_return` SET `amount`=?, `date`=?, `m_id`=?, `bail_m_id`=?, `given_by`=?, `given_user`=?  WHERE id = ?"
            console.log(q);
            const data = [
                amount,
                currentDate,
                mid,
                bailmid,
                collectedby,
                username,
                id
            ]
            const [rows] = await conn.query(q, data);
            console.log(data);
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, errmsg : "Error in Updating Category" });
        }
    } 
    
}
