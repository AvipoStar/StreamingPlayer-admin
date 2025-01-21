import "./styles/MainPage.css";

import { Tabs } from "../../ui/Tabs/Tabs";
import MyMusic from "./atoms/MyMusic";
import GenresTab from "./atoms/GenresTab";
import NewTracks from "./atoms/NewTracks";
import ListeningHistoty from "./atoms/ListeningHistoty";

export const MainPage = () => {
  return (
    <div className="main-page">
      <Tabs
        tabs={[
          {
            id: 0,
            text: "Моя музыка",
            children: <MyMusic />,
          },
          {
            id: 1,
            text: "Жанры",
            children: <GenresTab />,
          },
          {
            id: 2,
            text: "Недавно слушали",
            children: <ListeningHistoty />,
          },
          {
            id: 3,
            text: "Новинки",
            children: <NewTracks />,
          },
          // {
          //   id: 4,
          //   text: "Подкасты",
          //   children: <>В разработке</>,
          // },
        ]}
      ></Tabs>
    </div>
  );
};
