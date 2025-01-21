import React, { useState } from "react";
import "./MoreActions.css";
import { convertLocalPathToUrl } from "../../../helpers/functions/convertLocalPathToUrl";
import plusIcon from "../../../assets/icons/plus.svg";
import checkIcon from "../../../assets/icons/check_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import { createPlaylist } from "../logic/createPlaylist";
import { useSelector } from "react-redux";
import { toggleTrackInPlyalist } from "../logic/toggleTrackInPlyalist";

export interface IAddToPlaylist {
  id: number;
  title: string;
  preview_url: string;
  has_media_item: boolean;
}

interface IMoreActions {
  playlists: IAddToPlaylist[];
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: any;
}

export const MoreActions = (params: IMoreActions) => {
  const [isEnterName, setIsEnterName] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  const handleCreatePlaylist = async () => {
    const result = await createPlaylist(playlistName);
    if (result) {
      params.onClick(result.playlist_id);
      setTimeout(() => {
        location.reload(); // Перезагрузка страницы через 2 секунды
    }, 500);
    }
  };

  return (
    <div className="MoreActions">
      <div className="MoreActions-body">
        <ul>
          {params.playlists.map((playlist) => (
            <li>
              <div className="Playlist-info">
                <img
                  src={convertLocalPathToUrl(playlist.preview_url)}
                  className="Playlist-info-img"
                />
                <span>{playlist.title}</span>
              </div>
              <img
                src={playlist.has_media_item ? checkIcon : plusIcon}
                onClick={() => params.onClick(playlist.id)}
              />
            </li>
          ))}
          <li>
            <div className="Playlist-info">
              {isEnterName ? (
                <input
                  type="text"
                  value={playlistName}
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              ) : (
                <span onClick={() => setIsEnterName(true)}>Новый плейлист</span>
              )}
            </div>

            <img
              src={plusIcon}
              onClick={handleCreatePlaylist}
              style={{ cursor: "pointer", zIndex: 10}}
            />
          </li>
        </ul>
      </div>
      <div
        className="MoreActions-background"
        onClick={() => {
          params.setIsOpen(!params.isOpen);
          setIsEnterName(false);
        }}
      />
    </div>
  );
};
