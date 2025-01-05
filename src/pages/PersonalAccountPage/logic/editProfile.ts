import { uploadFile } from "../../../helpers/api/uploadFile";
import axiosInstance from "../../../helpers/axios/axiosInstance";
import { IEditUser } from "../../../helpers/redux/slices/userSlice";

export const editProfile = async (editUser: IEditUser, user_photo?: File) => {
  if (user_photo) {
    const photo_url = await uploadFile(user_photo);
    try {
      const response = await axiosInstance.put(
        `/userSettings/editUserProfile`,
        {
          email: editUser.email,
          password: editUser.password,
          name: editUser.name,
          surname: editUser.surname,
          patronymic: editUser.patronymic,
          bornDate: editUser.bornDate,
          photo_url: photo_url,
        }
      );
      return response.data.user_id;
    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      throw error;
    }
  }
  try {
    const response = await axiosInstance.put(`/userSettings/editUserProfile`, {
      email: editUser.email,
      password: editUser.password,
      name: editUser.name,
      surname: editUser.surname,
      patronymic: editUser.patronymic,
      bornDate: editUser.bornDate,
    });
    return response.data.user_id;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const becomeAuthor = async (nickname: string) => {
  try {
    const response = await axiosInstance.put(`/userSettings/becomeAuthor`, {
      value: nickname,
    });
    return response.data;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};
