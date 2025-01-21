import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getTablesData = async () => {
  try {
    const response = await axiosInstance.get("admin/tablesData");
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
