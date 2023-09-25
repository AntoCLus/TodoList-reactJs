import '/.App.js'
import '/.App.css'

const backgroundContainer = document.querySelector('.background-container');

let currentIndex = 0;

export function changeBackground(images) {
  if (currentIndex === images.length) {
    currentIndex = 0;
  }

  const image = images["./images/1.avif",
  "./images/2.avif",
  "./images/3.avif",
  "./images/4.avif"];
  backgroundContainer.style.backgroundImage = `url(${image})`;
  currentIndex++;

  setTimeout(() => changeBackground(images), 5000); 
}

changeBackground();
export default changeBackground;
