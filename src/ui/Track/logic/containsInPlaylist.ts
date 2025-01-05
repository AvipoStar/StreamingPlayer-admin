import axiosInstance from "../../../helpers/axios/axiosInstance";

export const containsInPlaylist = async (track_id: number) => {
  try {
    const response = await axiosInstance.get(
      `mediaItem/containsInPlaylists/${track_id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении информации о трэке в плейлистах:",
      error
    );
    throw error;
  }
};
