import React, { useEffect, useState } from "react";
import { ITrackParams, Track } from "../../ui/Track/Track";
import { useParams } from "react-router";
import { getGenreTracks } from "./logic/getGenreTracks";
import { IGenre } from "../../ui/Genre/Genre";

import "./styles/GenrePage.css";

const GenrePage = () => {
  const { genre_id } = useParams<{ genre_id: string }>();
  const [genre, setGenre] = useState<IGenre | null>(null);
  const [tracks, setTracks] = useState<ITrackParams[]>([]);

  useEffect(() => {
    const fetchTracks = async (id: number) => {
      const result = await getGenreTracks(id);
      if (result) {
        setTracks(result.tracks);
        setGenre(result.genre);
      }
    };
    if (genre_id) fetchTracks(Number(genre_id));
  }, [genre_id]);

  return (
    <div className="GenrePage">
      <div className="GenrePage-header">
        <div
          className="Genre-preview"
          style={{ backgroundColor: genre?.color }}
        />
        <div>
          <h3>Жанр</h3>
          <h1 className="Genre-title">{genre?.name}</h1>
        </div>
      </div>
      <div className="track-list">
        {tracks &&
          tracks.map((track, index) => (
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

export default GenrePage;
