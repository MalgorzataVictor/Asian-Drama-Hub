
function toggleFavorite(button) {
  button.classList.toggle("pink");
  button.classList.toggle("grey");

  const starIcon = button.querySelector(".star.icon");
  const buttonText = button.querySelector(".button-text");

  if (buttonText.textContent === "Add") {
    buttonText.textContent = "";
    starIcon.classList.add("yellow");
  } else {
    buttonText.textContent = "Add";
    starIcon.classList.remove("yellow");
  }
}
