import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "./helpers/api/getGenres";
import { setGenres } from "./helpers/redux/slices/genresSlice";
import routes from "./helpers/router/router";
import Header from "./ui/Header/Header";
import { getUserData, loginToken } from "./pages/LoginPage/logic/login";
import { setData } from "./helpers/redux/slices/userSlice";
import Spinner from "./ui/Spinner/Spinner";
import Sidebar from "./ui/Sidebar/Sidebar";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.user);
  const access_token = localStorage.getItem("access_token");
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const fetchGenres = async () => {
      const result = await getGenres();
      if (result) {
        dispatch(setGenres(result));
      }
    };
    fetchGenres();
  }, [dispatch]);

  useEffect(() => {
    const fetchLoginToken = async (access_token: string) => {
      setLoading(true);
      const user_id = await loginToken(access_token);
      if (user_id) {
        const response = await getUserData();
        if (response) {
          dispatch(setData(response));
          navigate("/");
        }
      }
      setLoading(false);
    };

    if (access_token && !userData) {
      fetchLoginToken(access_token);
    }
  }, [access_token, userData, navigate, dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spinner />
      </div>
    );
  }

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      <div className="MainContainer">
        {!isLoginPage && <Sidebar />}
        <Routes>
          {userData ? (
            Object.values(routes).map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
