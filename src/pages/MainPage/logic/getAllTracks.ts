import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getAllTracks = async () => {
  try {
    const response = await axiosInstance.get(`mediaItem/`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
