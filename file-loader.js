let imageName;
export function getImageName() {
  return imageName;
}

let imageUrl;
export function getImageUrl() {
  return imageUrl;
}

let callbacks = [];
export function subscribeOnUpload(callback) {
  if (typeof callback === 'function') callbacks.push(callback);
}

const fileInput = document.getElementById('map-file');
function handleFileChange() {
  if (!fileInput.files.length) return;
  imageUrl = URL.createObjectURL(fileInput.files[0]);
  imageName = fileInput.files[0].name;

  fileInput.style.display = 'none';
  callbacks.forEach(callback => typeof callback === 'function' ? callback() : null);
  fileInput.removeEventListener('change', handleFileChange);
}

fileInput.addEventListener('change', handleFileChange);
