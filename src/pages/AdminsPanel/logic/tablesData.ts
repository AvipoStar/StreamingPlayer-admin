import axiosInstance from "../../../helpers/axios/axiosInstance";
import { IUser } from "../../../helpers/redux/slices/userSlice";
import PasswordInput from "../../../ui/PasswordInput/PasswordInput";

export const getTablesData = async () => {
  try {
    const response = await axiosInstance.get("admin/tablesData");
    return response.data;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
