import conn from "./dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        console.log("Data"+req.body.username);
        const {username, password} = req.body
        try {
            // Query the database
            const q = `select * from cf_auth_info where username = '${username}' and password = '${password}'`
            console.log(q);
            const [rows] = await conn.query(q, [username, password]);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1 });
        }
    } else {
        // Handle any other HTTP method
    }
}