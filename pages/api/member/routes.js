import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let currentDate = new Date().toJSON().slice(0, 10);
        const {fullName, mobileNo, altMobileNo, email, address, aadharNo, backAcNo, ifsc, username} = req.body
        try {
            // Query the database
            const q = "INSERT INTO `cf_member_master`( `name`, `address`, `mobile_no`, `alt_mobile_no`, `email`, `aadhar_card`, `bank_ac`, `ifsc`, `add_by`, `date`, `update_by`, `update_date`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(q);
            const data = [
                fullName,
                address,
                mobileNo,
                altMobileNo,
                email,
                aadharNo,
                backAcNo,
                ifsc,
                username,
                currentDate,
                null,
                null
            ]
            const [rows] = await conn.query(q, data);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, errmsg : "Error in Adding Member" });
        }
    } 
    

    if(req.method == 'GET'){
        try {
            // Query the database
            const q = "SELECT * FROM cf_member_master"
            console.log(q);
            const [rows] = await conn.query(q);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, errmsg : "Error in Get Member" });
        }
    }
}