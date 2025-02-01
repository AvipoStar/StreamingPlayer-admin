export const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = duration % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export const formatCurrentTime = (currentTime: number) => {
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);

  let resultMinutes = "";
  let resultSeconds = "";
  
  if (minutes < 10) {
    resultMinutes = "0" + minutes;
  } else resultMinutes = minutes.toString();

  if (seconds < 10) {
    resultSeconds = "0" + seconds;
  } else resultSeconds = seconds.toString();
  return `${resultMinutes}:${resultSeconds}`;
};
