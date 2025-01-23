import { useEffect, useState } from "react";
import { ITrackParams, Track } from "../../../ui/Track/Track";
import { useSelector } from "react-redux";
import { IPlaylist, Playlist } from "../../../ui/Playlist/Playlist";
import { getUserPlaylists } from "../logic/getUserPlaylists";
import { getAllTracks } from "../logic/getAllTracks";
import favoritePhoto from "../../../assets/icons/favoritesPhoto.jpeg";
import { convertLocalPathToUrl } from "../../../helpers/functions/convertLocalPathToUrl";

import "../styles/MainPage.css";
import { getReport } from "../logic/getReport";
import { useNavigate } from "react-router";

const MyMusic = () => {
  const userSelector = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [allTracks, setAllTracks] = useState<ITrackParams[]>([]);

  useEffect(() => {
    fetchPlaylists();
    fetchAllTracks();
  }, [userSelector]);

  const fetchPlaylists = async () => {
    const result = await getUserPlaylists();
    if (result) setPlaylists(result);
  };

  const fetchAllTracks = async () => {
    const result = await getAllTracks();
    if (result) setAllTracks(result);
  };

  const handleGetReport = async () => {
    const result = await getReport();
    if (result) {
      navigate("/report", { state: { reportHTML: result } });
    }
  };

  return (
    <div className="main-page">
      <div className="playlists">
        <Playlist
          key={`playlist-${0}`}
          id={0}
          title={"Любимое"}
          preview_url={favoritePhoto}
        />
        {playlists.length ? (
          playlists.map((playlist) => (
            <Playlist
              key={`playlist-${playlist.id}`}
              id={playlist.id}
              title={playlist.title}
              preview_url={convertLocalPathToUrl(playlist?.preview_url)}
            />
          ))
        ) : (
          <></>
        )}
      </div>
      <div className="all-tracks">
        {allTracks.length ? (
          allTracks.map((track, index) => (
            <Track
              key={`track-${track.id}`}
              id={track.id}
              title={track.title}
              duration={track.duration}
              view_index={index}
              preview_url={track.preview_url}
              authors={track.authors}
              inFavorites={track.inFavorites}
            />
          ))
        ) : (
          <></>
        )}
      </div>

      <div>
        <h2>О тчет о понравившемся</h2>
        <button onClick={handleGetReport}>Получить</button>
      </div>
    </div>
  );
};

export default MyMusic;
