import React from "react";
import "./Album.css";
import { baseUrl } from "../../helpers/axios/axiosInstance";
import { generatePath, useNavigate } from "react-router";
import routes from "../../helpers/router/router";
import { ITrackParams } from "../Track/Track";
import { convertLocalPathToUrl } from "../../helpers/functions/convertLocalPathToUrl";

export interface IAlbumParams {
  id: number;
  title: string;
  preview_url: string;
  tracks?: ITrackParams[];
}

const Album = (params: IAlbumParams) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const albumPath = generatePath(routes.album.path, { album_id: params.id });
    navigate(albumPath);
  };

  return (
    <div className="Album" key={params.id} onClick={handleClick}>
      <img
        src={convertLocalPathToUrl(params.preview_url)}
        className="Album-preview"
      />
      <span className="Album-title">{params.title}</span>
    </div>
  );
};

export default Album;
