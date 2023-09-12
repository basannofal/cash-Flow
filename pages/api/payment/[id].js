// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL parameter

    if (req.method === 'GET') {
        try {
            const q = "SELECT *, DATE_FORMAT(date, '%Y-%m-%d') as date FROM cf_main_payment WHERE id = ?";
            const [rows] = await conn.query(q, [id]);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 1, msg : "Payment Cannot Fetch... Check Connection" });
        }
    } 
    
    
    if(req.method == 'DELETE'){
        try {
            const {id} = req.query
            console.log(id);
            // Query the database
            const q = "DELETE FROM cf_main_payment WHERE id = ?"
            console.log(q);
            const [rows] = await conn.query(q, [id]);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.toString().includes("Cannot delete or update a parent row")) {
                res.status(500).json({ error: 1, msg: "Payment Not Deleted... Already Use In Any Payment" });
            }
            else {
                res.status(500).json({ error: 1, msg: "Payment Cannot Delete... Check Connection" })
            }
        }
    }

    if (req.method == 'PATCH') {
        
        const {amount, collectedby, date, note, mid, cid, username} = req.body
        try {
            // Query the database
            const q = "UPDATE `cf_main_payment` SET `amount`= ?, `collected_by`= ?, `collected_user`= ?, `date`= ?, `note`= ?, `c_id`= ?  WHERE id = ?"
            console.log(q);
            const data = [
                amount,
                collectedby,
                username,
                date,
                note,
                cid,
                id
            ]
            const [rows] = await conn.query(q, data);
            console.log(data);
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            
            res.status(500).json({ error: 1, msg : "Payment Cannot Update... Check Connection" });
        }
    } 
    
}
