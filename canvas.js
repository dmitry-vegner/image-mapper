import {polygons, curPolygon, resetCurPolygon, savePolygons} from './polygons.js';

function adoptCanvasSize(canvas) {
  canvas.height = canvas.clientHeight;
  canvas.width = canvas.clientWidth;
}

function initCanvasCtx(ctx) {
  ctx.strokeStyle = 'rgb(0, 100, 0)';
  ctx.fillStyle = 'rgba(0, 50, 0, .2)';
  ctx.lineWidth = 2;
}

export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d'); 
export const offsetLeft = canvas.offsetLeft;
adoptCanvasSize(canvas);
initCanvasCtx(ctx);

export function startPath(x, y) {
  ctx.beginPath();
  ctx.moveTo(x - offsetLeft, y);
  curPolygon.vertexes.push([x, y]);
}

export function continuePath(x, y) {
  curPolygon.vertexes.push([x, y]);
  ctx.lineTo(x - offsetLeft, y);
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
