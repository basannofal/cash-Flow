import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        let currentDate = new Date().toJSON().slice(0, 10);
        const {amount, collectedby, mid, bailmid, username} = req.body
        try {
            // Query the database
            const q = "INSERT INTO `cf_borrow_payment`(`amount`, `date`, `m_id`, `bail_m_id`, `given_by`, `given_user`) VALUES (?, ?, ?, ?, ?, ?)"
            console.log(q);
            const data = [
                amount,
                currentDate,
                mid,
                bailmid,
                collectedby,
                username,
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
            const q = "SELECT * FROM cf_borrow_payment"
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