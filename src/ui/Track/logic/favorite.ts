import axiosInstance from "../../../helpers/axios/axiosInstance";

export const toggleFavoriteTrack = async (track_id: number) => {
  try {
    const response = await axiosInstance.post(`favorites/`, {
      value: track_id,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
