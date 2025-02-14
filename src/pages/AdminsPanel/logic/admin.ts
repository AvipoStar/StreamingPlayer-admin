import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getRequests = async () => {
  try {
    const response = await axiosInstance.get(
      "userSettings/resetPasswordRequests"
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};

export const resetPasswordResponse = async (request_id: number) => {
  try {
    const response = await axiosInstance.post(
      "userSettings/resetPasswordResponse",
      {
        id: request_id,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
