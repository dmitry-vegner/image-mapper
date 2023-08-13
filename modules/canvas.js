import {polygons, curPolygon, resetCurPolygon, savePolygons} from './polygons.js';
import {getImageUrl, subscribeOnUpload} from './file-loader.js';

export const canvas = document.getElementById('canvas');
export let ctx;

export function startPath(x, y) {
  ctx.beginPath();
  ctx.moveTo(x, y);
  curPolygon.vertexes.push([x, y]);
}

export function continuePath(x, y) {
  curPolygon.vertexes.push([x, y]);
  ctx.lineTo(x, y);
  ctx.stroke();
}

export function closePath(avoidSave = false) {
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  setTimeout(() => {
    if (!avoidSave) {
      curPolygon.hint = prompt();
      polygons.push(curPolygon);
    }
    savePolygons();
    resetCurPolygon();
  });
}

subscribeOnUpload(() => {
  canvas.style.backgroundImage = `url(${getImageUrl()})`;
  canvas.style.display = 'block';

  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;

  ctx = canvas.getContext('2d');
  ctx.strokeStyle = 'rgb(0, 100, 0)';
  ctx.fillStyle = 'rgba(0, 50, 0, .2)';
  ctx.lineWidth = 2;
});
