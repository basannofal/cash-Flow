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
        const {amount, returnby, widhrawername, mobileno, mid, cid, username} = req.body
        console.log("CC*************************************");
        console.log(req.body);
        try {
            // Query the database
            const q = "UPDATE `cf_main_payment_return` SET `amount`= ?, `return_by`= ?, `returned_user`= ?, `date`= ?, `withdrawer_name`= ?, `mobile_no`= ?, `m_id`= ?, `c_id`= ?  WHERE id = ?"
            console.log(q);
            const data = [
                amount,
                returnby,
                username,
                currentDate,
                widhrawername,
                mobileno,
                mid,
                cid,
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
