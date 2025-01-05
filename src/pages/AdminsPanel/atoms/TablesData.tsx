import React, { useEffect, useState } from "react";
import { getTablesData } from "../logic/tablesData";

const TablesData = () => {
  const [tablesData, setTablesData] = useState<any[]>([]);

  useEffect(() => {
    const fetchTablesData = async () => {
      try {
        const data = await getTablesData();
        setTablesData(data);
      } catch (error) {
        console.error("Ошибка при получении данных таблиц:", error);
      }
    };

    fetchTablesData();
  }, []);

  const getAllRows = () => {
    let summ = 0;
    tablesData.map((td) => (summ += td.rowCount));
    return summ;
  };

  return (
    <div>
      <h1>Данные таблиц</h1>
      {tablesData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Имя таблицы</th>
              <th>Количество строк</th>
            </tr>
          </thead>
          <tbody>
            {tablesData.map((table, index) => (
              <tr key={index}>
                <td>{table.tableName}</td>
                <td>{table.rowCount}</td>
              </tr>
            ))}
            <tr>
              <td>Всего:</td>
              <td>{getAllRows()}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>Нет данных для отображения</p>
      )}
    </div>
  );
};

export default TablesData;
