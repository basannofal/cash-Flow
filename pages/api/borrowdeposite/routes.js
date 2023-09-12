import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        const {amount, collectedby, dipositeby, mobileno,date, note, mid, username} = req.body
        try {
            // Query the database
            const q = "INSERT INTO `cf_deposit_borrowed_payment`(`amount`, `deposite_by`, `mobile_no`, `collected_by`, `collected_user`,  `date`, `note`, `m_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
            console.log(q);
            const data = [
                amount,
                dipositeby,
                mobileno,
                collectedby,
                username,
                date,
                note,
                mid,
            ]
            const [rows] = await conn.query(q, data);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, msg : "Deposite Payment Cannot Add... Check Connection" });
        }
    } 
    

    if(req.method == 'GET'){
        try {
            // Query the database
            
            const q = "SELECT mb.*, DATE_FORMAT(mb.date, '%Y-%m-%d') as date,   mm.fname, mm.mname, mm.lname, mm.nickname, mm.address, mm.mobile_no as member_mobile_no, mm.alt_mobile_no, mm.email, mm.aadhar_card, mm.bank_ac, mm.ifsc, mm.add_by, mm.date as member_date, mm.update_by as member_updated_by, mm.update_date as member_updated_date FROM cf_deposit_borrowed_payment AS mb JOIN cf_member_master AS mm ON mb.m_id = mm.id order by mb.id desc"
            console.log(q);
            const [rows] = await conn.query(q);
            console.log(rows);
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, msg : "Deposite Payment Cannot Fetch... Check Connection" });
        }
    }
}