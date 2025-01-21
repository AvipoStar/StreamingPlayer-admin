import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getNewTracks = async () => {
  try {
    const response = await axiosInstance.get(`mediaItem/last_tracks`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
