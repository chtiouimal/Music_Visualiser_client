import { useContext, useEffect, useRef, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";

function MusicPlayer() {
  const { dataContext, setDataContext } = useContext(PlayerContext);

  const [mp3url, setMp3url] = useState("");
  const [isplaying, setIsplaying] = useState(false);

  useEffect(() => {
    setIsplaying(dataContext?.isplaying);
    setMp3url(dataContext?.currentMusic?.music);
  }, [dataContext]);

  const audioRef = useRef(null);
  useEffect(() => {
    isplaying && audioRef.current.play();
    !isplaying && audioRef.current.pause();
  }, [isplaying]);

  if (isplaying) {
    audioRef.current.play();
  }

  return (
    <audio
      ref={audioRef}
      src={mp3url}
      onEnded={() => {
        setDataContext({ ...dataContext, currentMusic: {}, isplaying: false });
      }}
    ></audio>
  );
}

export default MusicPlayer;
