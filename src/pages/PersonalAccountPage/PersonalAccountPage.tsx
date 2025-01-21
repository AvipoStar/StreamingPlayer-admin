import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IUser } from "../../helpers/redux/slices/userSlice";

import "./styles/PersonalAccountPage.css";
import { Tabs } from "../../ui/Tabs/Tabs";
import { EditProfileTab } from "./atoms/EditProfileTab";
import { TracksTab } from "./atoms/TracksTab";
import { BecomeAuthor } from "./atoms/BecomeAuthorTab";
import { AlbumsTab } from "./atoms/AlbumsTab";

export const PersonalAccountPage = () => {
  const userSelector: IUser = useSelector((state: any) => state.user);

  const [filteredTabs, setFilteredTabs] = useState<any[]>([]);

  useEffect(() => {
    if (userSelector.is_author) {
      setFilteredTabs([
        {
          id: 0,
          text: "Профиль",
          children: <EditProfileTab />,
        },
        {
          id: 1,
          text: "Треки",
          children: <TracksTab />,
        },
        {
          id: 2,
          text: "Альбомы",
          children: <AlbumsTab />,
        },
      ]);
    } else {
      setFilteredTabs([
        {
          id: 0,
          text: "Профиль",
          children: <EditProfileTab />,
        },
        {
          id: 1,
          text: "Стать автором",
          children: <BecomeAuthor />,
        },
      ]);
    }
  }, []);

  return (
    <div className="PersonalAccountPage">
      <Tabs tabs={filteredTabs} />
    </div>
  );
};
