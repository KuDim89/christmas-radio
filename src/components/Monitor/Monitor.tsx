import React, { FC, useRef, useState } from 'react';
import playImg from '../../assets/img/play.svg';
import pauseImg from '../../assets/img/pause.svg';
import './Monitor.css';


export const Monitor: FC = () => {
  const [pause, setPause] = useState(true);
  const defaultPlayer = useRef<HTMLAudioElement | null>(null);
  let executeOnlyOnce = true;

  const controlOnPress = () => {
    if (executeOnlyOnce && defaultPlayer.current) {
      defaultPlayer.current.play();
      executeOnlyOnce = false;
    }

    setPause(!pause);
  }

  return (
    <div className="player">
      <img alt="Players control" src={pause ? playImg : pauseImg}/>
      <div className="control" onClick={controlOnPress}></div>
      <figure className="default-player">
        <figcaption>Default player with .mp3 stream</figcaption>
        <audio
          controls
          ref={defaultPlayer}
          muted={pause}
        >
          <source src="https://radioavenga.online/listen/avenga_radio/radio.mp3"/>
        </audio>
      </figure>
    </div>
  );
};