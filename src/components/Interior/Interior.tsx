import React, { FC, useEffect, useRef } from 'react';
import { useValue } from 'use-change';
import { IMAGES_INFO } from '../../constants/imagesInfo';
import './Interior.css';
import { Snowfall } from 'react-snowfall';
import { Monitor } from '../Monitor/Monitor';


type ImageType = {
  width: number;
  height: number;
  position: { x: number; y: number };
  frames?: number;
};

export const Interior: FC = () => {
  const proportionCoefficient = useValue((store) => store, 'proportionCoefficient' as never);
  const relativeXOffset = useValue((store) => store, 'relativeXOffset' as never);
  const lightsElement = useRef(null);
  const monitorElement = useRef(null);

  useEffect(() => {
    const initialSpriteSetting = (element: HTMLElement | null, image: ImageType, isStatic: boolean) => {
      if (!element) return;
      const frameCount = image.frames ?? 1;
      const defaultHeight = isStatic ? image.height : image.height / frameCount;

      element.style.height = Math.round(defaultHeight * proportionCoefficient * 100) / 100 + 'px';
      element.style.width = Math.round(image.width * proportionCoefficient * 100) / 100 + 'px';
      element.style.left = Math.round((image.position.x * proportionCoefficient + relativeXOffset) * 100) / 100 + 'px';
      element.style.top = Math.round(image.position.y * proportionCoefficient * 100) / 100 + 'px';
    };

    initialSpriteSetting(lightsElement.current, IMAGES_INFO.SPRITES.LIGHTS, false);
    initialSpriteSetting(monitorElement.current, IMAGES_INFO.STATIC.MONITOR, true);


  }, [proportionCoefficient, relativeXOffset]);

  return (
    <div className="interior-bg">
      <Snowfall color="#ffffff" style={{background: 'transparent'}} snowflakeCount={700}/>
      <div className="interior">
        <div className="lights" ref={lightsElement}></div>
        <div className="screen" ref={monitorElement}>
          <Monitor />
        </div>
      </div>
    </div>
  )
}