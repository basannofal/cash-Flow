import { useEffect } from 'react';
// import db from '../path/to/db';

const useInsert = (tableName, data) => {
  useEffect(() => {
    const insertData = async () => {
      try {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data);
        const placeholders = values.map(() => '?').join(', ');

        const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders})`;
        await db.query(query, values);
        console.log('Data inserted successfully.');
      } catch (error) {
        console.error('Error inserting data:', error);
      }
    };

    if (tableName && Object.keys(data).length > 0) {
      insertData();
    }
  }, [tableName, data]);
};

export default useInsert;