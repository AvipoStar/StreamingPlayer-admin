import { useEffect, useState } from "react";
import { ITrackParams, Track } from "../../../ui/Track/Track";
import { useSelector } from "react-redux";
import { getNewTracks } from "../logic/getNewTracks";

import "../styles/MainPage.css";

const NewTracks = () => {
  const userSelector = useSelector((state: any) => state.user);

  const [newTracks, setNewTracks] = useState<ITrackParams[]>([]);

  useEffect(() => {
    fetchNewTracks();
  }, [userSelector]);

  const fetchNewTracks = async () => {
    const result = await getNewTracks();
    if (result) setNewTracks(result);
  };
  return (
    <div className="main-page">
      <div className="all-tracks">
        {newTracks.length ? (
          newTracks.map((track, index) => (
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

export default NewTracks;
