import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let currentDate = new Date().toJSON().slice(0, 10);
        const {amount, collectedby, mid, cid, username} = req.body
        try {
            // Query the database
            const q = "INSERT INTO `cf_main_payment`(`amount`, `collected_by`, `collected_user`, `date`, `m_id`, `c_id`) VALUES (?, ?, ?, ?, ?, ?)"
            console.log(q);
            const data = [
                amount,
                collectedby,
                username,
                currentDate,
                mid,
                cid,
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
            const q = "SELECT mp.*,  mm.name, mm.address, mm.mobile_no, mm.alt_mobile_no, mm.email, mm.aadhar_card, mm.bank_ac, mm.ifsc, mm.add_by, mm.date, mm.update_by, mm.update_date, cat.name AS category_name FROM cf_main_payment AS mp JOIN cf_member_master mm ON mp.m_id = mm.id JOIN cf_category cat ON mp.c_id = cat.id order by mp.id desc"
            console.log(q);
            const [rows] = await conn.query(q);
            console.log(rows);
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, errmsg : "Error in Get Member" });
        }
    }
}