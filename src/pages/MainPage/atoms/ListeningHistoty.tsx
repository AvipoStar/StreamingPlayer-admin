import { useEffect, useState } from "react";
import { ITrackParams, Track } from "../../../ui/Track/Track";
import { useSelector } from "react-redux";
import "../styles/MainPage.css";
import { getListeningHistory } from "../logic/getListeningHistory";

const ListeningHistoty = () => {
  const userSelector = useSelector((state: any) => state.user);

  const [tracks, setTracks] = useState<ITrackParams[]>([]);

  useEffect(() => {
    fetchTracks();
  }, [userSelector]);

  const fetchTracks = async () => {
    const result = await getListeningHistory();
    if (result) setTracks(result);
  };
  return (
    <div className="main-page">
      <div className="all-tracks">
        {tracks.length ? (
          tracks.map((track, index) => (
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
    </div>
  );
};

export default ListeningHistoty;
