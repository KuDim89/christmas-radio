import React, { FC, useEffect } from 'react';
import './App.css';
import { useSet } from 'use-change';
import { IMAGES_INFO } from './constants/imagesInfo';
import { Interior } from './components/Interior/Interior';

const App: FC = () => {
  const setProportionCoefficient = useSet((store) => store, 'proportionCoefficient' as never);
  const setRelativeXOffset = useSet((store) => store, 'relativeXOffset' as never);

  useEffect(() => {
    const handleResize = () => {
      const coefficient = Math.round(window.innerHeight / IMAGES_INFO.STATIC.BACKGROUND.height * 100) / 100;
      setProportionCoefficient(coefficient as never);
      const relativeXOffset = Math.round((window.innerWidth - IMAGES_INFO.STATIC.BACKGROUND.width * coefficient) / 2 * 100) / 100;
      setRelativeXOffset(relativeXOffset as never);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="app">
        <Interior />
    </div>
  );
}

export default App;
