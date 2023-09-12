import conn from "../dbconfig/conn";

export default async function handler(req, res) {
    if (req.method == 'POST') {
        
        const {categoryName, subcategory} = req.body
        try {
            // Query the database
            const q = "INSERT INTO cf_category (`name`, `sub_category`)  VALUES (?, ?)"
            console.log(q);
            const [rows] = await conn.query(q, [categoryName, subcategory]);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, msg : "Category Cannot Add... Check Connection" });
        }
    } 
    
    if(req.method == 'GET'){
        try {
            // Query the database
            const q = "SELECT c1.id AS id, c1.name AS name, c1.sub_category AS subid, c2.name AS sub_category FROM cf_category AS c1 LEFT JOIN cf_category AS c2 ON c1.sub_category = c2.id"
            console.log(q);
            const [rows] = await conn.query(q);
            
            // Process the data and send the response
            res.status(200).json(rows);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ error: 1, msg : "Category Cannot Fetch... Check Connection" });
        }
    }
}