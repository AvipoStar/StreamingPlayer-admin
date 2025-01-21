import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { IAlbumParams } from "../../ui/Album/Album";
import Spinner from "../../ui/Spinner/Spinner";
import { Track } from "../../ui/Track/Track";
import { getAlbumTracks } from "./logic/getTracks";
import { convertLocalPathToUrl } from "../../helpers/functions/convertLocalPathToUrl";

import "./AlbumPage.css";
const AlbumPage = () => {
  const { album_id } = useParams<{ album_id: string }>();
  const [album, setAlbum] = useState<IAlbumParams | null>(null);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      const result = await getAlbumTracks(Number(album_id));
      if (result) setAlbum(result);
    };

    fetchAlbumTracks();
  }, [album_id]);

  useEffect(() => {
    console.log("album", album);
  }, [album]);

  if (!album) {
    return <Spinner />;
  }

  return (
    <div className="album-page">
      <div className="album-header">
        <img
          src={convertLocalPathToUrl(album.preview_url)}
          alt={album.title}
          className="album-cover"
        />
        <div>
          <h3>Альбом</h3>
          <h1 className="album-title">{album.title}</h1>
        </div>
      </div>
      <div className="track-list">
        {album.tracks &&
          album.tracks.map((track, index) => (
            <Track
              view_index={index + 1}
              id={track.id}
              title={track.title}
              duration={track.duration}
              inFavorites={track.inFavorites}
            />
          ))}
      </div>
    </div>
  );
};

export default AlbumPage;
