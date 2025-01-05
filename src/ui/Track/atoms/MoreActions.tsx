import React from "react";
import "./MoreActions.css";
import { convertLocalPathToUrl } from "../../../helpers/functions/convertLocalPathToUrl";
import plusIcon from "../../../assets/icons/plus.svg";
import checkIcon from "../../../assets/icons/check_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";

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
  onClick: any
}

export const MoreActions = (params: IMoreActions) => {
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
        </ul>
      </div>
      <div
        className="MoreActions-background"
        onClick={() => params.setIsOpen(!params.isOpen)}
      />
    </div>
  );
};
