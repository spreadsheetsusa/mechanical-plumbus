import { useEffect } from "react";
import mousetrap from 'mousetrap';

export const useMousetrapListener = () => {
  useEffect(() => {
    mousetrap.bind('meta+s', (e) => {
      e.preventDefault();
      new Audio(`/audio/saved.mp3`).play();
    });

    mousetrap.bind('meta+a', (e) => {
      new Audio(`/audio/selectall.mp3`).play();
    });
  }, []);
};
