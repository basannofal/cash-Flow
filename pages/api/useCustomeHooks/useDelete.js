import { useEffect } from 'react';
import db from '../path/to/db';

const useDelete = (tableName, whereClause) => {
  useEffect(() => {
    const deleteData = async () => {
      try {
        let whereConditions = '';
        let whereParams = [];

        if (whereClause && Array.isArray(whereClause.conditions)) {
          whereConditions = whereClause.conditions.map((condition, index) => {
            whereParams.push(condition.value);
            return `${index === 0 ? '' : condition.operator} ${condition.column} = ?`;
          }).join(' ');
        }

        const query = `DELETE FROM ${tableName} WHERE ${whereConditions}`;
        await db.query(query, whereParams);
        console.log('Data deleted successfully.');
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    };

    if (tableName) {
      deleteData();
    }
  }, [tableName, whereClause]);
};

export default useDelete;



// // Ex data 

// const deleteConditions = {
//   conditions: [
//     { column: 'age', value: 25, operator: 'AND' },
//     { column: 'is_active', value: 1, operator: 'OR' },
//   ],
// };

// // Usage of the custom hooks
//   useDelete('users', deleteConditions);