document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll("[data-scroll='true']");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeLightbox = document.querySelector(".close");

  // Scroll Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  });

  elements.forEach((element) => observer.observe(element));

  // Lightbox Functionality
  document.querySelectorAll(".letter img").forEach((img) => {
    img.addEventListener("click", (e) => {
      lightboxImg.src = e.target.src;
      lightbox.classList.remove("hidden");
    });
  });

  closeLightbox.addEventListener("click", () => {
    lightbox.classList.add("hidden");
    lightboxImg.src = "#";
  });
});




// Here starts the timeline fucntion 
let activeIndex = 0;
let autoRotateInterval;

function updateTimeline() {
    const years = document.querySelectorAll('.year');
    const container = document.getElementById('timeline-container');

    years.forEach((year, index) => {
        year.classList.remove('active');

        if (index === activeIndex) {
            year.classList.add('active');
            container.style.background = year.getAttribute('data-color');
        }
    });
}

function moveTimeline(direction) {
    const years = document.querySelectorAll('.year');
    activeIndex = (activeIndex + direction + years.length) % years.length;
    updateTimeline();
    restartAutoRotation();
}

function startAutoRotation() {
    autoRotateInterval = setInterval(() => {
        moveTimeline(1);
    }, 5000);
}

function stopAutoRotation() {
    clearInterval(autoRotateInterval);
}

function restartAutoRotation() {
    stopAutoRotation();
    startAutoRotation();
}

function expandView(year, imageSrc, text) {
  const modal = document.getElementById('modal');
  const modalImage = document.getElementById('modal-image');
  const modalText = document.getElementById('modal-text');

  modal.style.display = 'flex';
  modalImage.src = imageSrc;
  modalText.textContent = text;
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}

// Initialize the timeline
updateTimeline();
startAutoRotation();
