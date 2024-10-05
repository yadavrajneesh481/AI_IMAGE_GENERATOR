document.addEventListener("DOMContentLoaded", function () {
  const generateButton = document.getElementById("generate");
  const promptInput = document.getElementById("prompt");
  const heightInput = document.getElementById("hInput");
  const widthInput = document.getElementById("wInput");

  const imageContainer = document.getElementById("image-container");
  const loadingSpinner = document.getElementById("loading-spinner");
  const genText = document.getElementById("generatedText");
  const dlButton = document.getElementById("dlButton");

  generateButton.addEventListener("click", function () {
    // Check if promptInput.value is empty, and if so, use the default value
    var description = promptInput.value
      ? encodeURIComponent(promptInput.value)
      : "beautiful%20landscape";

    const randomSeed = Math.floor(Math.random() * 1000000000);

    // Get height and width values, or use defaults if not specified
    const heightA = heightInput.value ? parseInt(heightInput.value) : 360;
    const widthA = widthInput.value ? parseInt(widthInput.value) : 480;

    // Show the loading spinner while the image loads
    loadingSpinner.style.display = "block";
    genText.style.display = "none";

    // Hide the button with a fade out effect
    generateButton.classList.add("hide");

    const imageUrl = `https://image.pollinations.ai/prompt/${description}?nologo=1&seed=${randomSeed}&height=${heightA}&width=${widthA}`;
    console.log("URL: " + imageUrl);

    const image = document.createElement("img");

    image.onload = function () {
      // Hide the loading spinner once the image is loaded
      loadingSpinner.style.display = "none";
      genText.style.display = "block";
      document.getElementById("dlButton").setAttribute("href", imageUrl);
      dlButton.style.display = "block";

      // Show the button again with a fade in effect
      generateButton.classList.remove("hide");

      // Clear the previous image (if any) and append the new one
      imageContainer.innerHTML = "";
      imageContainer.appendChild(image);
    };

    image.src = imageUrl;
  });
});
