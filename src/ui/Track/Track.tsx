import "./Track.css";
import { convertLocalPathToUrl } from "../../helpers/functions/convertLocalPathToUrl";
import playIcon from "../../assets/icons/play_circle_24dp_007BFF_FILL1_wght400_GRAD0_opsz24.svg";
import favoriteIconFill from "../../assets/icons/favorite_24dp_007BFF_FILL1_wght400_GRAD0_opsz24.svg";
import favoriteIcon from "../../assets/icons/favorite_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import { useState } from "react";
import { toggleFavoriteTrack } from "./logic/favorite";
import addToPlaylist from "../../assets/icons/plus.svg";

import { generatePath, useNavigate } from "react-router-dom"; // Исправлено на react-router-dom
import routes from "../../helpers/router/router";
import { MoreActions } from "./atoms/MoreActions";
import { containsInPlaylist } from "./logic/containsInPlaylist";
import { toggleTrackInPlyalist } from "./logic/toggleTrackInPlyalist";
import { useDispatch } from "react-redux";
import { setCurrentTrack } from "../../helpers/redux/slices/CurrentTrack";
import { formatDuration } from "../../helpers/functions/formatDurration";

export interface ITrackParams {
  id: number;
  view_index?: number;
  preview_url?: string;
  title: string;
  duration: number;
  authors?: { id: number; nickname: string }[];
  inFavorites: boolean;
}

export const Track = (params: ITrackParams) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [inFavorite, setInFavorite] = useState<boolean>(params.inFavorites);
  const [showModalPlaylists, setShowModalPlaylists] = useState(false);

  const [playlists, setplaylists] = useState<any[]>([]);

  const handleFavorite = async () => {
    const result = await toggleFavoriteTrack(params.id);
    if (result) {
      setInFavorite(!inFavorite);
    }
  };

  const handleAuthorClick = (authorId: number) => {
    const authorPath = generatePath(routes.author.path, {
      author_id: authorId,
    });
    navigate(authorPath);
  };

  const handleOpenPlaylistsModal = async () => {
    const result = await containsInPlaylist(params.id);
    if (result) setplaylists(result);
    setShowModalPlaylists(!showModalPlaylists);
  };

  const togglePlaylist = async (playlist_id: number) => {
    const result = await toggleTrackInPlyalist(playlist_id, params.id);
    if (result) setShowModalPlaylists(!showModalPlaylists);
  };

  const handleTrackClick = (track: ITrackParams) => {
    console.log("track", track);
    dispatch(setCurrentTrack(track));
  };

  return (
    <div className="Track" key={params.id}>
      <div className="TrackData">
        <div
          className="TrackImageContainer"
          onClick={() => handleTrackClick(params)}
        >
          {params.preview_url ? (
            <img
              src={convertLocalPathToUrl(params.preview_url)}
              className="TrackImg"
              alt={params.title}
            />
          ) : (
            <span className="TrackIndex">{params.view_index}</span>
          )}
          <img src={playIcon} className="TrackPlayIcon" alt="Play" />
        </div>
        <div>
          <span className="TrackTitle">{params.title}</span>
          {params.authors && (
            <span className="TrackAuthors">
              {params.authors.map((a) => (
                <span
                  key={a.id}
                  className="TrackAuthor"
                  onClick={() => handleAuthorClick(a.id)}
                  style={{ cursor: "pointer" }}
                >
                  {a.nickname}
                </span>
              ))}
            </span>
          )}
        </div>
      </div>

      <div className="TrackHelpers">
        <img
          src={addToPlaylist}
          className="FavoriteImg"
          onClick={handleOpenPlaylistsModal}
        />
        <img
          className="FavoriteImg"
          src={inFavorite ? favoriteIconFill : favoriteIcon}
          onClick={handleFavorite}
        />
        <span className="TrackDuration">{formatDuration(params.duration)}</span>
      </div>

      {showModalPlaylists && (
        <MoreActions
          isOpen={showModalPlaylists}
          setIsOpen={setShowModalPlaylists}
          playlists={playlists}
          onClick={togglePlaylist}
        />
      )}
    </div>
  );
};
