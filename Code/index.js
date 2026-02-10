document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("image_modal");
  const modalImg = document.getElementById("modal-img");
  const closeBtn = document.getElementById("modal-close");
  const prevBtn = document.getElementById("prevImage");
  const nextBtn = document.getElementById("nextImage");

  const screenshotsProject1 = document.querySelectorAll(".screenshotProject1");
  const screenshotsProject2 = document.querySelectorAll(".screenshotProject2");
  let currentIndex = 0;
  let currentIsProject1 = false;

  function showImage(index, IsProject1) {
    if (IsProject1)
    {
        if (index < 0) index = screenshotsProject1.length - 1;

        if (index >= screenshotsProject1.length) index = 0;
    }
    else
    {
        if (index < 0) index = screenshotsProject2.length - 1;

        if (index >= screenshotsProject2.length) index = 0;
    }
    currentIndex = index;
    currentIsProject1 = IsProject1;
    if (IsProject1)
    {
        modalImg.src = screenshotsProject1[currentIndex].src;
    }
    else
    {
        modalImg.src = screenshotsProject2[currentIndex].src;
    }
  }

  // Open modal
  screenshotsProject1.forEach((img, index) => {
    img.onclick = () => {
      modal.style.display = "block";
      showImage(index, true);
    };
  });
    screenshotsProject2.forEach((img, index) => {
    img.onclick = () => {
      modal.style.display = "block";
      showImage(index, false);
    };
  });

  // Close modal
  closeBtn.onclick = () => modal.style.display = "none";

  // Buttons
  prevBtn.onclick = () => showImage(currentIndex - 1, currentIsProject1);
  nextBtn.onclick = () => showImage(currentIndex + 1, currentIsProject1);

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (modal.style.display !== "block") return;

    if (e.key === "ArrowLeft") showImage(currentIndex - 1, currentIsProject1);
    if (e.key === "ArrowRight") showImage(currentIndex + 1, currentIsProject1);
    if (e.key === "Escape") modal.style.display = "none";
  });

  // Click outside image closes modal
  modal.onclick = (e) => {
    if (e.target === modal) modal.style.display = "none";
  };
});

function copyEmail() {
    const email = document.getElementById("email-text").innerText;
    navigator.clipboard.writeText(email);
    alert("Email copied to clipboard");
  }