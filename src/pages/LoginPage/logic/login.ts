import axiosInstance from "../../../helpers/axios/axiosInstance";
import { IUser } from "../../../helpers/redux/slices/userSlice";

export const register = async (formData: IUser) => {
  try {
    const response = await axiosInstance.post("reg/register", {
      email: formData.email,
      password: formData.password,
      surname: formData.surname,
      name: formData.name,
      patronymic: formData.patronymic,
      bornDate: formData.bornDate,
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Ошибка при регистрации:", error);
    throw error;
  }
};

export const login = async (formData: IUser) => {
  try {
    const response = await axiosInstance.post("auth/login", {
      email: formData.email,
      password: formData.password,
    });
    return response.data;
  } catch (error: any) {
    console.error("Ошибка: ", error);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const response = await axiosInstance.get(`user/`);
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const loginToken = async (token: string) => {
  try {
    const response = await axiosInstance.post(`auth/loginToken`, {
      value: token,
    });
    return response.data.user_id;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const resetPassword = async (mail: string, password: string) => {
  try {
    const response = await axiosInstance.post(
      `/userSettings/resetPasswordRequest`,
      {
        mail: mail,
        new_password: password,
      }
    );
    return response.data.user_id;
  } catch (error) {
    console.error("Ошибка при запросе на сброс пароля:", error);
    throw error;
  }
};
