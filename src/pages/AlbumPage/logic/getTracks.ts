import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getAlbumTracks = async (album_id: number) => {
  try {
    const response = await axiosInstance.get(`/album/${album_id}`);
    return response.data.album;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};
