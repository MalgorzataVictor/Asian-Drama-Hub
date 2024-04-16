// Define arrays of image URLs for two carousels
const images1 = [
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/f4thailand.jpg?v=1713120439337",
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/golbin.jpg?v=1713120440896",
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/hiddenlove.jpg?v=1713120442561",
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/tomorrow.jpg?v=1713120444311"
];

const images2 = [
    "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/alchemyofsouls.jpg?v=1713120447317",
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/truebeauty.jpg?v=1713120449398",
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/vincenzo.jpg?v=1713120451604",
  "https://cdn.glitch.global/b0ba2a4d-6932-4f79-8cb2-4161611cd0bc/w.jpg?v=1713120453336"
];

// Initialize indices for both carousels
let currentIndex1 = 0;
let currentIndex2 = 0;

// Function to display an image in the first carousel
function showImage1(index) {
  const carousel = document.getElementById("imageCarousel1");
  carousel.innerHTML = `<img src="${images1[index]}" class="ui image">`;
}

// Function to display an image in the second carousel
function showImage2(index) {
  const carousel = document.getElementById("imageCarousel2");
  carousel.innerHTML = `<img src="${images2[index]}" class="ui image">`;
}

// Function to show the next image in the first carousel
function showNextImage1() {
  currentIndex1 = (currentIndex1 + 1) % images1.length;
  showImage1(currentIndex1);
}

// Function to show the previous image in the first carousel
function showPreviousImage1() {
  currentIndex1 = (currentIndex1 - 1 + images1.length) % images1.length;
  showImage1(currentIndex1);
}

// Function to show the next image in the second carousel
function showNextImage2() {
  currentIndex2 = (currentIndex2 + 1) % images2.length;
  showImage2(currentIndex2);
}

// Function to show the previous image in the second carousel
function showPreviousImage2() {
  currentIndex2 = (currentIndex2 - 1 + images2.length) % images2.length;
  showImage2(currentIndex2);
}

// Set intervals to automatically show the next image in both carousels every 4000 milliseconds (4 seconds)
setInterval(showNextImage1, 4000);
setInterval(showNextImage2, 4000);
