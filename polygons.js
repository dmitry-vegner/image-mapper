import {closePath, continuePath, startPath} from './canvas.js';
import {hasSaves, hash} from './hash.js';

export const polygons = hasSaves ? loadPolygons() : [];
export let curPolygon = {
  vertexes: [],
  hint: '',
};
drawPolygons();

export function resetCurPolygon() {
  curPolygon = {
    vertexes: [],
    hint: '',
  };
}

function loadPolygons() {
  try {
    const polygonsJson = localStorage.getItem(hash);
    const parsedPolygons = JSON.parse(polygonsJson);
    return parsedPolygons || [];
  } catch(error) {
    console.warn(error);
    return [];
  }
};

export function savePolygons() {
  const polygonsJson = JSON.stringify(polygons);
  localStorage.setItem(hash, polygonsJson);
}

function drawPolygons() {
  for (let {vertexes} of polygons) {
    startPath(vertexes[0][0], vertexes[0][1]);
    for (let i = 1; i < vertexes.length; i++) {
      continuePath(vertexes[i][0], vertexes[i][1]);
    }
    closePath(true);
  }
  resetCurPolygon();
}
