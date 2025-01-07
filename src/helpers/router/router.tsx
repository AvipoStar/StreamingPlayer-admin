import { AddMusicPage } from "../../pages/AddMusicPage/AddMusicPage";
import { AdminsPanel } from "../../pages/AdminsPanel/AdminsPanel";
import AlbumPage from "../../pages/AlbumPage/AlbumPage";
import AuthorPage from "../../pages/AuthorPage/AuthorPage";
import GenrePage from "../../pages/GenretPage/GenrePage";
import { LoginPage } from "../../pages/LoginPage/LoginPage";
import { MainPage } from "../../pages/MainPage/MainPage";
import { NotFoundPage } from "../../pages/NotFound/NotFoundPage";
import { PersonalAccountPage } from "../../pages/PersonalAccountPage/PersonalAccountPage";
import PlaylistPage from "../../pages/PlaylistPage/PlaylistPage";

const routes = {
  main: {
    path: "/",
    element: <MainPage />,
    name: "Главная",
  },
  personalAccount: {
    path: "/PersonalAccount",
    element: <PersonalAccountPage />,
    name: "Личный кабинет",
  },
  addMusicPage: {
    path: "/AddMusicPage",
    element: <AddMusicPage />,
    name: "Управление медиа",
  },
  adminsPanel: {
    path: "/AdminsPanel",
    element: <AdminsPanel />,
    name: "Панель администратора",
  },
  login: {
    path: "/login",
    element: <LoginPage />,
    name: "Вход",
  },
  notFound: {
    path: "/*",
    element: <NotFoundPage />,
    name: "Страница не найдена",
  },
  author: {
    path: "/author/:author_id",
    element: <AuthorPage />,
    name: "Страница автора",
  },
  album: {
    path: "/album/:album_id",
    element: <AlbumPage />,
    name: "Страница альбома",
  },
  playlist: {
    path: "/playlist/:playlist_id",
    element: <PlaylistPage />,
    name: "Страница плейлиста",
  },
  genre: {
    path: "/genre/:genre_id",
    element: <GenrePage />,
    name: "Страница жанра",
  },
};

export default routes;
