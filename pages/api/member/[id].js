// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL parameter

    if (req.method === 'GET') {
        try {
            const q = "SELECT * FROM cf_member_master WHERE id = ?";
            const [rows] = await conn.query(q, [id]);
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching category by ID:', error);
            res.status(500).json({ error: 1, msg : "Member Cannot Fetch... Check Connection" });
        }
    } 
    
    
    if(req.method == 'DELETE'){
        try {
            const {id} = req.query
            console.log(id);
            // Query the database
            const q = "DELETE FROM cf_member_master WHERE id = ?"
            console.log(q);
            const [rows] = await conn.query(q, [id]);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            if (error.toString().includes("Cannot delete or update a parent row")) {
                res.status(500).json({ error: 1, msg: "Member Not Deleted... Member Has Some Payments Data Or It May be Bail of Any Member" });
            }
            else {
                res.status(500).json({ error: 1, msg: "Member Cannot Delete... Check Connection" })
            }
        }
    }

    if (req.method == 'PATCH') {
        let currentDate = new Date().toJSON().slice(0, 10);
        console.log(req.body);
        const {fname, mname, lname, nickname, mobileNo, altMobileNo, email, address, aadharNo, backAcNo, ifsc, username} = req.body
        try {
            // Query the database
            const q = "UPDATE `cf_member_master` SET `fname`=?, `mname`=?, `lname`=?, `nickname`=?, `address`=?, `mobile_no`=?, `alt_mobile_no`=?, `email`=?, `aadhar_card`=?, `bank_ac`=?, `ifsc`=?, `update_by`=?,`update_date`= ?  WHERE id = ?"
            console.log(q);
            const data = [
                fname,
                mname,
                lname,
                nickname,
                address,
                mobileNo,
                altMobileNo,
                email,
                aadharNo,
                backAcNo,
                ifsc,
                username,
                currentDate,
                id
            ]
            const [rows] = await conn.query(q, data);
            console.log(data);
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            
            res.status(500).json({ error: 1, msg : "Member Cannot Update... Check Connection" });
        }
    } 
    
}
