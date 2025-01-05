import axiosInstance from "../../../helpers/axios/axiosInstance";

export const toggleTrackInPlyalist = async (
  playlist_id: number,
  track_id: number
) => {
  try {
    const response = await axiosInstance.post(`playlist/toggleTrack`, {
      playlist_id: playlist_id,
      track_id: track_id,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Ошибка при получении информации о трэке в плейлистах:",
      error
    );
    throw error;
  }
};
