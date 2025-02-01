import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getAudioUrl = async (track_id: number) => {
  try {
    const response = await axiosInstance.get(`player/audio/${track_id}`, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    return url;
  } catch (error) {
    console.error("Error fetching audio:", error);
  }
};
