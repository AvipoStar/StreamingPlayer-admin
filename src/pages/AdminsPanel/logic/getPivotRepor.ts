import axiosInstance from "../../../helpers/axios/axiosInstance";

export const getReporPivotTable = async (dateStart: string, dateEnd: string) => {
  try {
    const response = await axiosInstance.post("admin/getReporPivotTable", {
      dateStart: dateStart,
      dateEnd: dateEnd,
    });
    console.log("response.data", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
