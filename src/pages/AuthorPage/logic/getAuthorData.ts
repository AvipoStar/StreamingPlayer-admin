import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getAuthorData = async (author_id: number) => {
  try {
    const response = await axiosInstance.get(`author/${author_id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const getAuthorTracks = async (author_id: number) => {
  try {
    const response = await axiosInstance.get(`author/getTracks/${author_id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const getAuthorAlbums = async (author_id: number) => {
  try {
    const response = await axiosInstance.get(`author/getAlbums/${author_id}`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};
