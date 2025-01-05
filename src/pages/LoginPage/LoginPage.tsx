import { useState } from "react";
import "./styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IUser, setData } from "../../helpers/redux/slices/userSlice";
import { getUserData, login, register, resetPassword } from "./logic/login";
import PasswordInput from "../../ui/PasswordInput/PasswordInput";
import Spinner from "../../ui/Spinner/Spinner";
import Modal from "../../ui/Modal/Modal";

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [formData, setFormData] = useState<IUser>({
    email: "",
    password: "",
    surname: "",
    name: "",
    patronymic: "",
    bornDate: "",
  });
  const [errors, setErrors] = useState<any>({});

  const [loading, setLoading] = useState(false);

  const [showResetPassword, setShowResetPassword] = useState(false);
  const [mail, setmail] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validate = () => {
    const newErrors: any = {};
    if (!formData.email) newErrors.email = "Email обязателен";
    if (!formData.password) newErrors.password = "Пароль обязателен";
    if (isRegistering) {
      if (!formData.surname) newErrors.surname = "Фамилия обязательна";
      if (!formData.name) newErrors.name = "Имя обязательно";
      if (!formData.bornDate) newErrors.bornDate = "Дата рождения обязательна";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogIn = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      let response: any = {};
      let response2: any = {};
      setLoading(true);
      if (isRegistering) {
        response = await register(formData);
        if (response) {
          localStorage.setItem("access_token", response.access_token);
          response2 = await getUserData();
        }
      } else {
        response = await login(formData);
        if (response) {
          localStorage.setItem("access_token", response.access_token);
          response2 = await getUserData();
        }
      }

      if (response2) {
        console.log("response2", response2);
        dispatch(setData(response2));
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Ошибка при выполнении запроса:", error);
      alert("Ошибка при выполнении запроса!");
    }
  };

  const handleResetPassword = async () => {
    try {
      const result = await resetPassword(mail, newPassword);
      if (result) {
        alert("Запрос отправлен");
      }
    } catch (error) {
      console.error("Ошибка при выполнении запроса:", error);
      alert("Ошибка при выполнении запроса!");
    }
  };
  return (
    <div className="container">
      <h2>{isRegistering ? "Регистрация" : "Авторизация"}</h2>
      <div className="form">
        <div className="formGroup">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div className="formGroup">
          <label>Пароль:</label>
          <PasswordInput
            password={formData.password}
            handleChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        {isRegistering && (
          <>
            <div className="formGroup">
              <label>Фамилия:</label>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
              />
              {errors.surname && <p>{errors.surname}</p>}
            </div>
            <div className="formGroup">
              <label>Имя:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>
            <div className="formGroup">
              <label>Отчество:</label>
              <input
                type="text"
                name="patronymic"
                value={formData.patronymic}
                onChange={handleChange}
              />
            </div>
            <div className="formGroup">
              <label>Дата рождения:</label>
              <input
                type="date"
                name="bornDate"
                value={formData?.bornDate}
                onChange={handleChange}
              />
              {errors.bornDate && <p>{errors.bornDate}</p>}
            </div>
          </>
        )}
        <button onClick={handleLogIn}>
          {isRegistering ? "Зарегистрироваться" : "Войти"}
        </button>
      </div>
      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="toggleButton"
      >
        {isRegistering
          ? "Уже есть аккаунт? Войти"
          : "Нет аккаунта? Зарегистрироваться"}
      </button>
      <button
        onClick={() => setShowResetPassword(true)}
        className="toggleButton"
      >
        Забыли пароль?
      </button>
      {
        <Modal isOpen={showResetPassword} onClose={setShowResetPassword}>
          <div className="formGroup">
            <div className="formGroup">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={mail}
                onChange={(e) => setmail(e.target.value)}
              />
              {errors.email && <p>{errors.email}</p>}
            </div>
            <label>Новый пароль</label>
            <PasswordInput
              password={newPassword}
              handleChange={(e) => setnewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>
              Отправить заявку на смену пароля
            </button>
          </div>
        </Modal>
      }
      {loading && <Spinner />}
    </div>
  );
};
