import React from "react";
import ReactPlayer from "react-player/youtube";
import "./TrailerModal.css";
import CrossIcon from "../../Assets/times-solid.svg";

const TrailerModal = ({ url, showTrailer }) => {
  const videoUrl = url[url.length - 1];
  return (
    <div className="modal-background">
      <div className="modal-container">
        <div className="menu-section">
          <button className="close" onClick={() => showTrailer(false)}>
            <img src={CrossIcon} alt="" className="cross-icon" />
          </button>
        </div>
        <div className="player-container">
          <ReactPlayer
            controls={true}
            playing={true}
            width="100%"
            height="100%"
            url={`https://www.youtube.com/watch?v=${videoUrl.key}`}
            onEnded={() => showTrailer(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default TrailerModal;
