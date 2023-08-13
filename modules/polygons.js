import {getImageName, subscribeOnUpload} from './file-loader.js';
import {closePath, continuePath, startPath} from './canvas.js';

subscribeOnUpload(() => {
  polygons = loadPolygons();
  drawPolygons();
});

export let polygons = [];
export let curPolygon = {
  vertexes: [],
  hint: '',
};

export function resetCurPolygon() {
  curPolygon = {
    vertexes: [],
    hint: '',
  };
}

function loadPolygons() {
  try {
    const polygonsJson = localStorage.getItem(getImageName());
    const parsedPolygons = JSON.parse(polygonsJson);
    return parsedPolygons || [];
  } catch(error) {
    console.warn(error);
    return [];
  }
};

export function savePolygons() {
  const polygonsJson = JSON.stringify(polygons);
  localStorage.setItem(getImageName(), polygonsJson);
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
