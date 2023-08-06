import { useEffect, useState } from 'react';
import conn from '../dbconfig/conn';

const useSelect = (tableName, conditions = '', limit = null, orderBy = '', groupBy = '') => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = `SELECT * FROM ${tableName}`;

        if (conditions) {
          query += ` WHERE ${conditions}`;
        }

        if (groupBy) {
          query += ` GROUP BY ${groupBy}`;
        }

        if (orderBy) {
          query += ` ORDER BY ${orderBy}`;
        }

        if (limit) {
          query += ` LIMIT ${limit}`;
        }

        const [results] = await conn.promise().query(query);
        setData(results);
      } catch (error) {
        setError('Error fetching data.');
      } finally {
        setLoading(false);
      }
    };

    if (tableName) {
      fetchData();
    }
  }, [tableName, conditions, limit, orderBy, groupBy]);

  return { data, loading, error };
};

export default useSelect;



// const tableName = 'users';
// const conditions = 'age > 25 AND is_active = 1';
// const limit = 10;
// const orderBy = 'name ASC';
// const groupBy = 'department';

// const { data, loading, error } = useSelectData(tableName, conditions, limit, orderBy, groupBy);
