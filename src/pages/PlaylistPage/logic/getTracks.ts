import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getPlaylistTracks = async (playlist_id: number) => {
  try {
    const response = await axiosInstance.get(`/playlist/${playlist_id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const getFavoritesTracks = async () => {
  try {
    const response = await axiosInstance.get(`/favorites/`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};
