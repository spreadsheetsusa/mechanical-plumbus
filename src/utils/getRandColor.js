import { colors } from './colors';
import { getRandBool } from './getRandBool';

export const getRandColor = () => {
  const rand = Math.floor(Math.random() * colors.length)
  return getRandBool() ? colors[rand] : 'white';
};

