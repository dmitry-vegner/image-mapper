import {curPolygon} from './modules/polygons.js';
import {updateHint, updateCursor} from './modules/map.js';
import {canvas, startPath, continuePath, closePath} from './modules/canvas.js';

canvas.addEventListener('mousemove', ({clientX, clientY}) => {
  updateHint(clientX, clientY);
  updateCursor(clientX, clientY);
});

canvas.addEventListener('click', ({clientX, clientY}) => {
  if (!curPolygon.vertexes.length) {
    startPath(clientX, clientY);
  } else {
    const [x, y] = curPolygon.vertexes[0];
    const isStartPoint = x - 10 <= clientX && clientX <= x + 10 && y - 10 <= clientY && clientY <= y + 10;
    isStartPoint ? closePath() : continuePath(clientX, clientY);
  }
});

