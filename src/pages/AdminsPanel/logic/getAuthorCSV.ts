import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getAuthorStatistics = async (period: string | null) => {
  try {
    const params = period ? { period } : {};

    const response = await axiosInstance.get("admin/getAuthorStats", {
      params,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
