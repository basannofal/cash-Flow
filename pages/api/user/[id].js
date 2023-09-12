// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    const { id } = req.query; // Get the dynamic ID from the URL parameter

    if (req.method === 'GET') {
        try {
            const q = "SELECT * FROM cf_auth_info WHERE id = ?";
            const [rows] = await conn.query(q, [id]);

            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 1, msg : "User Cannot Fetch... Check Connection" });
        }
    }


    if (req.method == 'DELETE') {
        try {
            const { id } = req.query
            console.log(id);
            // Query the database
            const q = "DELETE FROM cf_auth_info WHERE id = ?"
            console.log(q);
            const [rows] = await conn.query(q, [id]);

            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            if (error.toString().includes("Cannot delete or update a parent row")) {
                res.status(500).json({ error: 1, msg: "User Not Deleted... Already Use In Any Payment" });
            }
            else {
                res.status(500).json({ error: 1, msg: "User Cannot Delete... Check Connection" })
            }
        }
    }

    if (req.method == 'PATCH') {

        const { name, number, email, username, password, isAdmin } = req.body
        try {
            // Query the database
            const q = "UPDATE `cf_auth_info` SET `name`= ?, `number`= ?, `email`= ?, `username`= ?, `password`= ?, `is_admin`= ? WHERE id = ?"
            console.log(q);
            const data = [
                name,
                number,
                email,
                username,
                password,
                isAdmin,
                id
            ]
            const [rows] = await conn.query(q, data);

            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ error: 1, msg : "User Cannot Update... Check Connection" });
        }
    }

}
