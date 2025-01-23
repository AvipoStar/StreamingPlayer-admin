import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getReporGenres = async () => {
  try {
    const response = await axiosInstance.get("admin/getReporGenres");
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
