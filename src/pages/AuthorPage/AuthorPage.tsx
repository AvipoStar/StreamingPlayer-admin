import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { convertLocalPathToUrl } from "../../helpers/functions/convertLocalPathToUrl";
import {
  getAuthorAlbums,
  getAuthorData,
  getAuthorTracks,
} from "./logic/getAuthorData";
import { ITrackParams, Track } from "../../ui/Track/Track";
import Album, { IAlbumParams } from "../../ui/Album/Album";

const AuthorPage = () => {
  const { author_id } = useParams<{ author_id: string }>();
  const [authorData, setAuthorData] = useState<{
    id: number;
    nickname: string;
    photo_url: string;
  }>({ id: -1, nickname: "", photo_url: "" });
  const [authorTracks, setAuthorTracks] = useState<ITrackParams[]>([]);
  const [authorAlbums, setAuthorAlbums] = useState<IAlbumParams[]>([]);

  useEffect(() => {
    const fetchAuthorData = async (id: number) => {
      const result = await getAuthorData(id);
      if (result) setAuthorData(result);
    };
    const fetchAuthorTracks = async (id: number) => {
      const result = await getAuthorTracks(id);
      if (result) setAuthorTracks(result);
    };
    const fetchAuthorAlbums = async (id: number) => {
      const result = await getAuthorAlbums(id);
      if (result) setAuthorAlbums(result);
    };
    if (author_id) {
      fetchAuthorData(Number(author_id));
      fetchAuthorTracks(Number(author_id));
      fetchAuthorAlbums(Number(author_id));
    }
  }, [author_id]);

  useEffect(() => {
    console.log("authorData", authorData);
  }, [authorData]);

  useEffect(() => {
    console.log("authorTracks", authorTracks);
  }, [authorTracks]);

  useEffect(() => {
    console.log("authorAlbums", authorAlbums);
  }, [authorAlbums]);

  return (
    <div className="album-page">
      <div className="album-header">
        <img
          src={convertLocalPathToUrl(authorData.photo_url)}
          className="album-cover"
        />
        <div>
          <h1 className="album-title">{authorData.nickname}</h1>
        </div>
      </div>
      <div className="track-list">
        {authorTracks &&
          authorTracks.map((track, index) => (
            <Track
              view_index={index + 1}
              id={track.id}
              title={track.title}
              duration={track.duration}
              inFavorites={track.inFavorites}
            />
          ))}
      </div>
      <div className="AlbumList">
        {authorAlbums.length > 0 &&
          authorAlbums.map((album) => (
            <Album
              id={album.id}
              preview_url={album.preview_url}
              title={album.title}
            />
          ))}
      </div>
    </div>
  );
};

export default AuthorPage;
