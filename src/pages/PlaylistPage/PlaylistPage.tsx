import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Spinner from "../../ui/Spinner/Spinner";
import { ITrackParams, Track } from "../../ui/Track/Track";
import { convertLocalPathToUrl } from "../../helpers/functions/convertLocalPathToUrl";

import "./PlaylistPage.css";
import { getFavoritesTracks, getPlaylistTracks } from "./logic/getTracks";

import favoriteImg from "../../assets/icons/favoritesPhoto.jpeg";
import { IPlaylist } from "../../ui/Playlist/Playlist";

const PlaylistPage = () => {
  const { playlist_id } = useParams<{ playlist_id: string }>();
  const [playlist, setPlaylist] = useState<IPlaylist | null>(null);
  const [favorites, setFavorites] = useState<ITrackParams[]>([]);

  useEffect(() => {
    console.log("playlist_id", playlist_id);
    const fetchPlaylistTracks = async () => {
      const result = await getPlaylistTracks(Number(playlist_id));
      if (result) setPlaylist(result);
    };

    const fetchFavoritesTracks = async () => {
      const result = await getFavoritesTracks();
      if (result) setFavorites(result);
    };

    if (Number(playlist_id) == 0) {
      fetchFavoritesTracks();
    } else {
      fetchPlaylistTracks();
    }
  }, [playlist_id]);

  return (
    <>
      {playlist || favorites ? (
        <div className="album-page">
          {Number(playlist_id) == 0 ? (
            <>
              <div className="album-header">
                <img src={favoriteImg} className="album-cover" />
                <div>
                  <h1 className="album-title">Любимое</h1>
                </div>
              </div>
              <div className="track-list">
                {favorites &&
                  favorites.map((track, index) => (
                    <Track
                      view_index={index + 1}
                      id={track.id}
                      title={track.title}
                      duration={track.duration}
                      inFavorites={track.inFavorites}
                      authors={track.authors}
                    />
                  ))}
              </div>
            </>
          ) : (
            <>
              {playlist && (
                <>
                  <div className="album-header">
                    <img
                      src={convertLocalPathToUrl(playlist.preview_url)}
                      alt={playlist.title}
                      className="album-cover"
                    />
                    <div>
                      <h3>Плейлист</h3>
                      <h1 className="album-title">{playlist.title}</h1>
                    </div>
                  </div>
                  <div className="track-list">
                    {playlist.tracks &&
                      playlist.tracks.map((track, index) => (
                        <Track
                          view_index={index + 1}
                          id={track.id}
                          title={track.title}
                          duration={track.duration}
                          inFavorites={track.inFavorites}
                        />
                      ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default PlaylistPage;
