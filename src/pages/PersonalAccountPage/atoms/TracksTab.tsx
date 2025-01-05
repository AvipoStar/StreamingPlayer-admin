import { useEffect, useState } from "react";
import { IUser } from "../../../helpers/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { ITrackParams, Track } from "../../../ui/Track/Track";
import { getAuthorTracks } from "../logic/tracks";

export const TracksTab = () => {
  const userSelector: IUser = useSelector((state: any) => state.user);

  const [trackList, setTrackList] = useState<ITrackParams[]>([]);

  useEffect(() => {
    if (userSelector?.userId) {
      fetchAuthorTracks(userSelector.userId);
    }
  }, [userSelector]);

  const fetchAuthorTracks = async (user_id: number) => {
    const result = await getAuthorTracks(user_id);
    if (result) setTrackList(result);
  };

  return (
    <div className="EditProfileForm" style={{ minWidth: "500px" }}>
      <h2>Все трэки</h2>
      <div className="TrackList">
        {trackList.length > 0 &&
          trackList.map((track) => (
            <Track
              id={track.id}
              preview_url={track.preview_url}
              title={track.title}
              duration={track.duration}
              authors={track.authors}
              inFavorites={track.inFavorites}
            />
          ))}
      </div>
    </div>
  );
};
