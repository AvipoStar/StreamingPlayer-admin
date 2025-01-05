import React, { useEffect, useState } from "react";
import {
  IEditUser,
  IUser,
  updateUser,
} from "../../../helpers/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { editProfile } from "../logic/editProfile";
import PasswordInput from "../../../ui/PasswordInput/PasswordInput";
import { FileUploader } from "../../../ui/FileUploader/FileUploader";

export const EditProfileTab = () => {
  const userSelector: IUser = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [user, setUser] = useState<IEditUser>({
    surname: userSelector.surname,
    name: userSelector.name,
    patronymic: userSelector.patronymic,
    bornDate: userSelector.bornDate,
    email: userSelector.email,
    password: userSelector.password,
  });
  const [user_photo, setUser_photo] = useState<File | null>(null);

  useEffect(() => {
    setUser(userSelector);
  }, [userSelector]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (user_photo) {
      const result = await editProfile(user, user_photo);
      if (result) alert("Данные изменены");
    } else {
      const result = await editProfile(user);
      if (result) alert("Данные изменены");
    }

    dispatch(updateUser(user));
  };

  return (
    <>
      <div className="EditProfileForm">
        <h2>Личный кабинет</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              <strong>Имя:</strong>
              <input
                type="text"
                name="name"
                value={user.name || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Фамилия:</strong>
              <input
                type="text"
                name="surname"
                value={user.surname || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Отчество:</strong>
              <input
                type="text"
                name="patronymic"
                value={user.patronymic || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Дата рождения:</strong>
              <input
                type="date"
                name="bornDate"
                value={user.bornDate || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Email:</strong>
              <input
                type="email"
                name="email"
                value={user.email || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Пароль:</strong>
              <PasswordInput
                password={user.password || ""}
                handleChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <strong>Фото профиля:</strong>
              <FileUploader
                required={false}
                file={user_photo}
                onFileUpload={setUser_photo}
              />
            </label>
          </div>
          <div>
            <button type="submit">Сохранить</button>
          </div>
        </form>
      </div>
    </>
  );
};
