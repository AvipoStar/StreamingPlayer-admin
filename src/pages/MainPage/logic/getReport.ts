import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getReport = async () => {
  try {
    const response = await axiosInstance.get(`favorites/getTracksHTML`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
