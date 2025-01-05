import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/redux/slices/userSlice";
import { useSelector } from "react-redux";
import Album, { IAlbumParams } from "../../../ui/Album/Album";
import { getAuthorAlbums } from "../logic/albums";

export const AlbumsTab = () => {
  const userSelector: IUser = useSelector((state: any) => state.user);

  const [albumList, setAlbumList] = useState<IAlbumParams[]>([]);

  useEffect(() => {
    if (userSelector.userId) fetchAuthorAlbums(userSelector.userId);
  }, [userSelector]);

  const fetchAuthorAlbums = async (author_id: number) => {
    const result = await getAuthorAlbums(author_id);
    if (result) setAlbumList(result);
  };

  return (
    <div className="EditProfileForm" style={{ minWidth: "500px" }}>
      <h2>Все альбомы</h2>
      <div className="AlbumList">
        {albumList.length > 0 &&
          albumList.map((track) => (
            <Album
              id={track.id}
              preview_url={track.preview_url}
              title={track.title}
            />
          ))}
      </div>
    </div>
  );
};
