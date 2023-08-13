import {polygons, curPolygon} from './polygons.js';
import {isVertexInPolygon} from './geometry.js';

export function updateHint(x, y) {
  const {hint = ''} = polygons.find(polygon => isVertexInPolygon(polygon.vertexes, x, y)) ?? {};
  document.getElementById('hint').textContent = hint;
}

export function updateCursor(x, y) {
  const [fpx, fpy] = curPolygon.vertexes[0] ?? [];
  const isInside = fpx == null || fpy == null ? false :
    fpx - 10 <= x && x <= fpx + 10 && fpy - 10 <= y && y <= fpy + 10;
  document.body.style.cursor = isInside ? 'pointer' : 'default';
}

