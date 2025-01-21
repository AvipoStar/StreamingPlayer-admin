import axiosInstance from "../../../helpers/axios/axiosInstance";

export const createPlaylist = async (name: string) => {
  try {
    const response = await axiosInstance.post(`playlist/`, {
      value: name,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при создании плейлиста", error);
    throw error;
  }
};
