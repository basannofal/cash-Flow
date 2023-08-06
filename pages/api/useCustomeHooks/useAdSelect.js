import { useEffect } from 'react';
import conn from '@/pages/api/dbconfig/conn';

const useAdSelect = (tableName, columns, joinTable, joinCondition, whereConditions, orderBy) => {
  useEffect(() => {
    const selectData = async () => {
      try {
        let query = `SELECT ${columns.join(', ')} FROM ${tableName}`;

        if (joinTable && joinCondition) {
          query += ` JOIN ${joinTable} ON ${joinCondition}`;
        }

        let whereClause = '';
        let whereParams = [];

        if (whereConditions && Array.isArray(whereConditions.conditions)) {
          whereClause = whereConditions.conditions.map((condition, index) => {
            whereParams.push(condition.value);
            return `${index === 0 ? 'WHERE' : condition.operator} ${condition.column} = ?`;
          }).join(' ');
        }

        query += ` ${whereClause}`;

        if (orderBy) {
          query += ` ORDER BY ${orderBy}`;
        }

        const [results] = await conn.promise().query(query, whereParams);
        console.log('Selected data:', results);
      } catch (error) {
        console.error('Error selecting data:', error);
      }
    };

    if (tableName && columns.length > 0) {
      selectData();
    }
  }, [tableName, columns, joinTable, joinCondition, whereConditions, orderBy]);
};

export default useAdSelect;



//    // Select all columns from the 'users' table
//    useAdSelect('users', ['*']);

//    // Select specific columns from the 'users' table
//    useAdSelect('users', ['id', 'name', 'email']);

//    // Select data from the 'users' table with a join to the 'orders' table
//    useAdSelect('users', ['users.id', 'users.name', 'orders.order_id'], 'orders', 'users.id = orders.user_id');

//    // Select data from the 'users' table with advanced filtering
//    const whereConditions = {
//      conditions: [
//        { column: 'age', value: 25, operator: 'AND' },
//        { column: 'is_active', value: 1, operator: 'OR' },
//      ],
//    };
//    useAdSelect('users', ['*'], null, null, whereConditions);

//    // Select data from the 'users' table with ordering
//    useAdSelect('users', ['*'], null, null, null, 'name ASC');
