import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getListeningHistory = async () => {
  try {
    const response = await axiosInstance.get(`mediaItem/listening_history`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
