import "./App.css";
import { MvCanvas, MvProgressBar } from "./components";
import LOGO from "./assets/files/mv_logo.svg";
import LOGOICON from "./assets/files/mv-logo-h.svg";
import { useEffect, useMemo, useState } from "react";
import MusicPlayer from "./feautres/player";
import { PlayerContext } from "./context/PlayerContext";
import { getSelectedCollections } from "./services/collection";
import { Avatar } from "antd";

function App() {
  const [loading, setLoading] = useState(true);
  const [dataContext, setDataContext] = useState({});

  const value = useMemo(() => ({ dataContext, setDataContext }), [dataContext]);

  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    getSelectedCollections()
      .then((res) => {
        setData(res.data.data);
        setSuccess(res.data.success);
        setDataContext({
          data: res.data.data,
          success: res.data.success,
          currentMusic: res.data.data.songs[0],
          isplaying: false,
          maxDistance: 32,
          minDistance: -32,
          voted: "",
        });
      })
      .catch((err) => console.log(err));
    setTimeout(() => {
      setLoading(false);
    }, 4000);
  }, []);

  const playingIcon =
    "https://firebasestorage.googleapis.com/v0/b/music-gallery-da2d1.appspot.com/o/Backgrounds%2Fdisc_texture.png?alt=media&token=f29e142d-ce4d-422c-a03c-d24a7b956e5a";

  return (
    <PlayerContext.Provider value={value}>
      <div id="canvas-container">
        <div className="logo">
          <img src={LOGO} alt="mv_logo" />
        </div>
        {dataContext.isplaying && (
          <div className="mv-current-track">
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Avatar size={45} src={dataContext.currentMusic.coverArt} />
              <div>
                <h3 className="mv-small-title">
                  {dataContext.currentMusic.songName}
                </h3>
                <span className="mv-small-text">
                  {dataContext.currentMusic.songArtist}
                </span>
              </div>
            </div>
            <div style={{ padding: "0px 8px" }}>
              <img
                src={playingIcon}
                alt="playing_icon"
                height="45"
                width="45"
                className="mv-spin"
              />
            </div>
          </div>
        )}
        <MusicPlayer />
        {loading && (
          <div className="mv-loading-screen">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 80,
                maxHeight: 300,
                minWidth: 300,
              }}
            >
              <img src={LOGOICON} alt="mv_logo_icon" />
              <MvProgressBar />
            </div>
          </div>
        )}
        <MvCanvas value={value} />
      </div>
    </PlayerContext.Provider>
  );
}

export default App;
