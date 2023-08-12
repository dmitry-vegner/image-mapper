export const hasSaves = !!location.hash;
export const hash = location.hash.slice(1) || getHash();
if (!hasSaves) location.hash = hash;

function getHash() {
  let hash = '';

  const aCode = 'a'.charCodeAt(0);
  const zCode = 'z'.charCodeAt(0);
  for (let i = 0; i < 10; i++) {
    const charCode = Math.round(aCode + Math.random() * (zCode - aCode));
    hash += String.fromCharCode(charCode);
  };

  return hash;
}
