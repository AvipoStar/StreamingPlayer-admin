import { Tabs } from "../../ui/Tabs/Tabs";
import { AddAlbumForm } from "./atoms/AddAlbumForm";
import { AddTrackForm } from "./atoms/AddTrackForm";
import "./styles/AddMusicPage.css";

export const AddMusicPage = () => {
  return (
    <div className="AddMusicPage">
      <Tabs
        tabs={[
          {
            id: 0,
            text: "Альбомы",
            children: <AddAlbumForm />,
          },
          {
            id: 1,
            text: "Трэки",
            children: <AddTrackForm />,
          },
          {
            id: 2,
            text: "Аудиокниги",
            children: <div>В разработке</div>,
          },
        ]}
      />
    </div>
  );
};
