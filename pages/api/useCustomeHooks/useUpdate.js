import { useEffect } from 'react';
import db from '../path/to/db';

const useUpdate = (tableName, data, whereClause) => {
  useEffect(() => {
    const updateData = async () => {
      try {
        const setValues = Object.entries(data).map(([column, value]) => `${column} = ?`);
        const updateValues = Object.values(data);

        let whereConditions = '';
        let whereParams = [];

        if (whereClause && Array.isArray(whereClause.conditions)) {
          whereConditions = whereClause.conditions.map((condition, index) => {
            whereParams.push(condition.value);
            return `${index === 0 ? '' : condition.operator} ${condition.column} = ?`;
          }).join(' ');
        }

        const query = `UPDATE ${tableName} SET ${setValues.join(', ')} ${whereConditions}`;
        await db.query(query, [...updateValues, ...whereParams]);
        console.log('Data updated successfully.');
      } catch (error) {
        console.error('Error updating data:', error);
      }
    };

    if (tableName && Object.keys(data).length > 0) {
      updateData();
    }
  }, [tableName, data, whereClause]);
};

export default useUpdate;



// // Ex data 
// const updateData = { name: 'John Doe', age: 30 };
// const deleteConditions = {
//   conditions: [
//     { column: 'age', value: 25, operator: 'AND' },
//     { column: 'is_active', value: 1, operator: 'OR' },
//   ],
// };

// // Usage of the custom hooks
// useUpdate('users', updateData, deleteConditions);