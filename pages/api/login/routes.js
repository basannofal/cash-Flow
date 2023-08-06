import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'GET') {
        console.log("body " + req.body);
        try {
            // Query the database
            const [rows] = await conn.query('select * from cf_auth_info where username = "basannofal" and password = "basannofal"');
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 'Failed to fetch users' });
        }
    } else {
        // Handle any other HTTP method
    }
}