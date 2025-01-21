import "./Playlist.css";
import { generatePath, useNavigate } from "react-router";
import routes from "../../helpers/router/router";

export interface IPlaylist {
  id: number;
  title: string;
  preview_url: string;
  tracks?: any[];
}

export const Playlist = (params: IPlaylist) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const playlistPath = generatePath(routes.playlist.path, {
      playlist_id: params.id,
    });
    navigate(playlistPath);
  };

  return (
    <div className="Playlist" key={params.id} onClick={handleClick}>
      <img src={params.preview_url} className="Playlist-img" />
      <h3 className="Playlist-title">{params.title}</h3>
    </div>
  );
};
