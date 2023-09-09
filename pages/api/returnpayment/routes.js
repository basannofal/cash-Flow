import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const { amount, returnby, widhrawername, mobileno, date, note, mid, cid, username } = req.body
        
        try {
            // Query the database
            const q = "INSERT INTO `cf_main_payment_return`( `amount`, `return_by`, `returned_user`, `date`, `withdrawer_name`, `mobile_no`, `note`, `m_id`, `c_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(q);
            const data = [
                amount,
                returnby,
                username,
                date,
                widhrawername,
                mobileno,
                note,
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

            const q = "SELECT mb.*, DATE_FORMAT(mb.date, '%Y-%m-%d') as date, mm.fname, mm.mname, mm.lname, mm.nickname,  mm.address, mm.mobile_no as member_mobile_no, mm.alt_mobile_no, mm.email, mm.aadhar_card, mm.bank_ac, mm.ifsc, mm.add_by,  mm.date as member_date, mm.update_by as member_updated_by, mm.update_date as member_updated_date FROM cf_main_payment_return AS mb JOIN cf_member_master AS mm ON mb.m_id = mm.id  order by mb.id desc"
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