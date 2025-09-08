// import React, { useEffect, useState } from "react";
// import YouTube from "react-youtube";

// const PersistentPlayer = () => {
//   const [videoId, setVideoId] = useState(
//     localStorage.getItem("videoId") || "2POCPrNa-do"
//   );
//   const [startTime, setStartTime] = useState(
//     parseFloat(localStorage.getItem("startTime")) || 0
//   );

//   const opts = {
//     playerVars: {
//       autoplay: 1,
//       start: startTime,
//     },
//   };

//   const onReady = (event) => {
//     event.target.seekTo(startTime, true);
//     event.target.playVideo();
//   };

//   const onStateChange = (event) => {
//     if (event.data === 1) {
//       // playing
//       const interval = setInterval(() => {
//         localStorage.setItem("startTime", event.target.getCurrentTime());
//       }, 2000);
//       return () => clearInterval(interval);
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("videoId", videoId);
//   }, [videoId]);

//   return (
//     <div
//       style={{ position: "fixed", bottom: "10px", right: "10px", zIndex: 9999 }}
//     >
//       <YouTube
//         videoId={videoId}
//         opts={opts}
//         onReady={onReady}
//         onStateChange={onStateChange}
//       />
//     </div>
//   );
// };

// export default PersistentPlayer;


import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import styles from "./PersistentPlayer.module.css";

const PersistentPlayer = () => {
  const [videoId, setVideoId] = useState(
    localStorage.getItem("videoId") || "2POCPrNa-do"
  );
  const [startTime, setStartTime] = useState(
    parseFloat(localStorage.getItem("startTime")) || 0
  );

  const opts = {
    playerVars: {
      autoplay: 1,
      start: startTime,
    },
  };

  const onReady = (event) => {
    event.target.seekTo(startTime, true);
    event.target.playVideo();
  };

  const onStateChange = (event) => {
    if (event.data === 1) {
      const interval = setInterval(() => {
        localStorage.setItem("startTime", event.target.getCurrentTime());
      }, 2000);
      return () => clearInterval(interval);
    }
  };

  useEffect(() => {
    localStorage.setItem("videoId", videoId);
  }, [videoId]);

  return (
    <div className={styles.playerWrapper}>
      <YouTube
        videoId={videoId}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};

export default PersistentPlayer;
