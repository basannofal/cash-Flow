import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let currentDate = new Date().toJSON().slice(0, 10);
        const { amount, returnby, widhrawername, mobileno, mid, cid, username } = req.body
        try {
            // Query the database
            const q = "INSERT INTO `cf_main_payment_return`( `amount`, `return_by`, `returned_user`, `date`, `withdrawer_name`, `mobile_no`, `m_id`, `c_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(q);
            const data = [
                amount,
                returnby,
                username,
                currentDate,
                widhrawername,
                mobileno,
                mid,
                cid
            ]
            const [rows] = await conn.query(q, data);

            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, errmsg: "Error in Adding Member" });
        }
    }


    if (req.method == 'GET') {
        try {
            // Query the database

            const q = "SELECT mb.*, mm.fname, mm.mname, mm.lname, mm.nickname,  mm.address, mm.mobile_no, mm.alt_mobile_no, mm.email, mm.aadhar_card, mm.bank_ac, mm.ifsc, mm.add_by, mm.date, mm.update_by, mm.update_date, bm.name AS bail_name  FROM cf_main_payment_return AS mb JOIN cf_member_master AS mm ON mb.m_id = mm.id LEFT JOIN cf_member_master AS bm ON mb.bail_m_id = bm.id order by mb.id desc"
            console.log(q);
            const [rows] = await conn.query(q);
            console.log(rows);
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, errmsg: "Error in Get Member" });
        }
    }
}