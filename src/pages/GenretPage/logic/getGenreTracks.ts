import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getGenreTracks = async (genre_id: number) => {
  try {
    const response = await axiosInstance.get(`/genre/${genre_id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};
