import { useState } from 'react';
import Confetti from 'react-dom-confetti';
import { Howl, Howler } from 'howler';

import { ReactComponent as TascFooter } from './media/images/tasc-byline.svg';
import { ReactComponent as Logo } from './media/images/logo.svg';

import { useMousetrapListener } from './hooks';
import { colors, getRandBool, getRandColor } from './utils';

import './style.css';

const clamp = (number, min, max) => {
  return Math.max(min, Math.min(number, max));
}

const sndbnk = [
  "1.mp3",
  "2.mp3",
  "3.mp3",
  "4.mp3",
  "6.mp3",
  "7.mp3",
  "8.mp3",
  "9.mp3",
  "10.mp3",
  "11.mp3",
  "12.mp3",
  "13.mp3",
  "14.mp3",
  "15.mp3",
  "16.mp3",
  "17.mp3",
  "18.mp3",
  "19.mp3",
  "20.mp3",
  "21.mp3",
  "22.mp3",
  "23.mp3",
  "24.mp3",
  "25.mp3",
  "26.mp3",
  "27.mp3",
  "28.mp3",
  "29.mp3",
  "bell-ding-rattle.mp3",
  "dump-it.mp3",
  "gleeeed.mp3",
  "recorder-1.mp3",
  "recorder-6.mp3",
  "sneak1.mp3",
  "squirt.mp3",
  "thurmp.mp3",
  "tom.mp3",
  "wet.mp3",
  "whoawhoa.mp3",
  "whoop-ding.mp3",
];

// var sound = new Howl({
//   src: ['sounds.mp3'],
//   sprite: {
//     blast: [0, 3000],
//     laser: [4000, 1000],
//     winner: [6000, 5000]
//   }
// });

// // Change global volume.
// Howler.volume(0.5);

// Shoot the laser!
// sound.play('laser');

const config = () => ({
  angle: Math.floor(Math.random() * 359),
  spread: Math.floor(Math.random() * 359),
  startVelocity:20,
  elementCount: Math.floor(Math.random() * 50),
  dragFriction: 0.12,
  duration: 2000,
  stagger: Math.floor(Math.random() * 20),
  width: "4px",
  height: "4px",
  perspective: clamp(Math.floor(Math.random() * 998), 200, 999),
  colors
});

export const App = () => {
  useMousetrapListener();
  const [textVal, setTextVal] = useState(localStorage.getItem('textVal') || '');
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  const handleTyping = (e) => {
    setTextVal(e.target.value);
    localStorage.setItem('textVal', e.target.value)
    setIsConfettiActive(true);
    const rand = Math.floor(Math.random() * sndbnk.length);

    const sound = new Howl({
      src: [`/audio/${sndbnk[rand]}`]
    });
    sound.play();

    setTimeout(() => getRandBool() && setIsConfettiActive(false), 100);
  };

  const setVolume = (val) => {
    Howler.volume(val.target.valueAsNumber / 100);
  };

  return (
    <div className="container mx-auto mb-0">
      <header className="w-full mx-auto mt-4 mb-4 text-center md:mt-10 md:mb-8 md:w-1/2">
        <Logo className="w-40 m-auto transition-all duration-200 md:w-64 type-logo" style={{ fill: getRandColor() }} />
      </header>

      <div className="w-full px-3 text-left md:w-1/2 md:mx-auto">
        <textarea
          onChange={handleTyping} value={textVal}
          className="w-full px-3 py-2 text-white border rounded shadow-xl outline-none mousetrap"
          placeholder="Type something... Get it out."
          autoFocus
        />
        <div className="flex mt-3">
          <div className="flex-grow-0">
            <label htmlFor="vol-control leading-tight">Volume</label>
          </div>
          <div className="flex-grow">
            <input
              id="vol-control"
              type="range"
              min="0"
              max="100"
              step="1"
              onInput={setVolume}
              onChange={setVolume}
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="w-64 mx-auto mt-6 md:mt-10">
        <Confetti active={isConfettiActive} config={ config() }/>
        <a href="http://spreadsheetsusa.com" target="_blank" rel="noopener noreferrer">
          <TascFooter className="mx-auto overflow-visible" style={{ fill: '#abb2bf', maxWidth: 250 }} />
        </a>
      </div>
    </div>
  );
}
