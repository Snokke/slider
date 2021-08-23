/* eslint-disable no-unused-vars */
enum HERO_STATE {
  Idle = 'Idle',
  MoveRight = 'MoveRight',
  MoveLeft = 'MoveLeft',
  MoveTop = 'MoveTop',
  MoveDown = 'MoveDown',
}

const HERO_CONFIG = {
  speed: 700,
};

export { HERO_CONFIG, HERO_STATE };
