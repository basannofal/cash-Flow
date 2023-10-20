// api/category/[id].js

import conn from "../dbconfig/conn";

export default async function handler(req, res) {
  const { id } = req.query; // Get the dynamic ID from the URL parameter

  if (req.method === "GET") {
    try {
      // const sq = "    SELECT 'cf_main_payment' AS table_name, id, amount,collected_by, collected_user, date, note, m_id, c_id FROM cf_main_payment WHERE m_id = 14 UNION ALL SELECT 'cf_main_payment_return' AS table_name, id, amount, return_by, returned_user, date, note, m_id, c_id FROM cf_main_payment_return WHERE m_id = 14 UNION ALL SELECT 'cf_borrow_payment' AS table_name, id, amount, given_by AS collected_by, given_user AS collected_user, date, note, m_id, bail_m_id AS c_id FROM cf_borrow_payment WHERE m_id = 14 UNION ALL SELECT 'cf_deposit_borrowed_payment' AS table_name, id, amount, deposite_by AS collected_by, collected_user, date, note, m_id, NULL AS c_id FROM cf_deposit_borrowed_payment WHERE m_id = 14 ORDER BY date; "
      console.log("*********THIS*********" + id);

      const q =
        "SELECT main_query.*, category.name AS cat_name FROM ( SELECT 'Fund Payment' AS table_name, '1' AS type, id, amount, collected_by, collected_user, DATE_FORMAT(date, '%Y-%m-%d') as date, note, m_id, c_id FROM cf_main_payment WHERE m_id = ? UNION ALL SELECT 'Refund Payment' AS table_name, '0' AS type, id, amount, return_by, returned_user, DATE_FORMAT(date, '%Y-%m-%d') as date, note, m_id, c_id FROM cf_main_payment_return WHERE m_id = ? UNION ALL SELECT 'Borrow Payment' AS table_name, '0' AS type, id, amount, given_by AS collected_by, given_user AS collected_user, DATE_FORMAT(date, '%Y-%m-%d') as date, note, m_id, NULL AS c_id FROM cf_borrow_payment WHERE m_id = ? UNION ALL SELECT 'RePay Payment' AS table_name, '1' AS type, id, amount, deposite_by AS  collected_by, collected_user, DATE_FORMAT(date, '%Y-%m-%d') as date, note, m_id, NULL AS c_id FROM cf_deposit_borrowed_payment WHERE m_id = ? ) AS main_query LEFT JOIN cf_category AS category ON main_query.c_id = category.id ORDER BY main_query.date;";

      const data = [id, id, id, id];
      const [rows] = await conn.query(q, data);
      console.log("******************");
      console.log(rows);
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error: 1,
        msg: "Borrow Payment Cannot Fetch... Check Connection",
      });
    }
  }

  if (req.method == "DELETE") {
    try {
      const { id } = req.query;
      console.log(id);
      // Query the database
      const q = "DELETE FROM cf_borrow_payment WHERE id = ?";
      console.log(q);
      const [rows] = await conn.query(q, [id]);

      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      if (error.toString().includes("Cannot delete or update a parent row")) {
        res.status(500).json({
          error: 1,
          msg: "Borrow Payment Not Deleted... Already Use In Any Payment",
        });
      } else {
        res.status(500).json({
          error: 1,
          msg: "Borrow Payment Cannot Delete... Check Connection",
        });
      }
    }
  }

  if (req.method == "PATCH") {
    const { amount, collectedby, note, date, mid, bailmid, username } =
      req.body;
    try {
      // Query the database
      const q =
        "UPDATE `cf_borrow_payment` SET `amount`=?, `date`=?, `note`=?, `m_id`=?, `bail_m_id`=?, `given_by`=?, `given_user`=?  WHERE id = ?";
      console.log(q);
      const data = [
        amount,
        date,
        note,
        mid,
        bailmid,
        collectedby,
        username,
        id,
      ];
      const [rows] = await conn.query(q, data);
      console.log(data);
      // Process the data and send the response
      res.status(200).json(rows);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({
        error: 1,
        msg: "Borrow Payment Cannot Update... Check Connection",
      });
    }
  }
}
