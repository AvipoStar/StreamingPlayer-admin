import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getUserPlaylists = async () => {
  try {
    const response = await axiosInstance.get(`/playlist/`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
