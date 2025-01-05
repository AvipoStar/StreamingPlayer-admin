import React, { useEffect, useState } from "react";
import { getRequests, resetPasswordResponse } from "../logic/admin";

const PasswordReset = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getRequests();
        setRequests(data);
      } catch (error) {
        console.error("Ошибка при получении запросов на сброс пароля:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleResetPassword = async (request_id: number) => {
    try {
      await resetPasswordResponse(request_id);
      const data = await getRequests();
      setRequests(data);
    } catch (error) {
      console.error("Ошибка при сбросе пароля:", error);
    }
  };
  return (
    <div>
      {requests.length > 0 ? (
        <>
          <h2>Запросы на сброс пароля</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Действие</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request: any) => (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{request.mail}</td>
                  <td>
                    <button onClick={() => handleResetPassword(request.id)}>
                      Сбросить пароль
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        "Запросы не найдены"
      )}
    </div>
  );
};

export default PasswordReset;
