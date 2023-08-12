export const polygons = [];
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
