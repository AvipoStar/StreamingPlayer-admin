import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAudioUrl } from "./logic/getTrack";
import "./Player.css";
import { ITrackParams } from "../Track/Track";
import {
  formatCurrentTime,
  formatDuration,
} from "../../helpers/functions/formatDurration";
import VolumeImg from "../../assets/icons/volume_up_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import VolumeOffImg from "../../assets/icons/volume_off_24dp_007BFF_FILL0_wght400_GRAD0_opsz24.svg";
import playIcon from "../../assets/icons/play_circle_24dp_007BFF_FILL1_wght400_GRAD0_opsz24.svg";
import pauseIcon from "../../assets/icons/pause_24dp_007BFF_FILL1_wght400_GRAD0_opsz24.svg";

export const Player = () => {
  const currentTrack: ITrackParams = useSelector(
    (state: any) => state.currentTrack
  );
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const fetchAudioUrl = async () => {
      const result = await getAudioUrl(currentTrack.id);
      if (result) {
        setAudioUrl(result);
        setIsPlaying(false);
      }
    };

    fetchAudioUrl();
  }, [currentTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(event.target.value));
  };

  const handleVolumeImgClick = () => {
    if (volume > 0) setVolume(0);
    else setVolume(0.5);
  };

  useEffect(() => {
    console.log("isPlaying", isPlaying);
  }, [isPlaying]);

  return (
    <div className="Player">
      <section className="TrackMetaData">
        <div className="TrackControls">
          <img
            src={isPlaying ? pauseIcon : playIcon}
            alt="Play"
            onClick={handlePlayPause}
          />
          <span>{currentTrack.title}</span>
        </div>
        <div className="TrackControls">
          <div className="VolumeControl">
            <img
              src={volume > 0 ? VolumeImg : VolumeOffImg}
              className="VolumeImg"
              onClick={() => handleVolumeImgClick()}
            />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
            />
            <span className="VolumeValue">{Math.ceil(volume * 100)} %</span>
          </div>
          <span>
            {formatCurrentTime(currentTime)} /{" "}
            {formatDuration(currentTrack.duration)}
          </span>
        </div>
      </section>
      <div className="ProgressBar">
        <input
          type="range"
          min="0"
          max={currentTrack.duration}
          value={currentTime}
          onChange={handleSeek}
        />
      </div>

      <audio
        ref={audioRef}
        src={audioUrl || ""}
        onTimeUpdate={handleTimeUpdate}
        onWaiting={() => setIsPlaying(false)}
      />
    </div>
  );
};
