/* ===============================
   Scroll doux vers une section
   =============================== */
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({
    top: el.offsetTop - 70, // pour ne pas coller le header sticky
    behavior: "smooth"
  });
}

/* ======================================
   Initialisation générale au chargement
   ====================================== */
document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  initProjectsCarousel();
  initVideoSection(); // une seule vidéo
});

/* ===============================
   CARROUSEL — SECTION PROJETS
   =============================== */
function initProjectsCarousel() {
  const track = document.querySelector(".projects-track");
  const slides = Array.from(document.querySelectorAll(".project-slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  const total = slides.length;

  function goToSlide(index) {
    currentIndex = (index + total) % total; // boucle infinie
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;

    // Mise à jour des dots
    dots.forEach(dot => dot.classList.remove("active"));
    const activeDot = dots.find(d => Number(d.dataset.index) === currentIndex);
    if (activeDot) activeDot.classList.add("active");
  }

  // Boutons
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentIndex + 1);
    });
  }

  // Clic sur les dots
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.index);
      goToSlide(index);
    });
  });

  // Auto-play léger (facultatif)
  let autoPlay = setInterval(() => {
    goToSlide(currentIndex + 1);
  }, 9000);

  // Pause au survol du carrousel
  const carousel = document.querySelector(".projects-carousel");
  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
    carousel.addEventListener("mouseleave", () => {
      autoPlay = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 9000);
    });
  }

  // Initialisation position
  goToSlide(0);
}

/* ===============================
   SECTION VIDÉO — UNE SEULE VIDÉO
   =============================== */
function initVideoSection() {
  const video = document.getElementById("mainVideo");
  const overlay = document.querySelector(".video-overlay-play");

  if (!video || !overlay) return;

  // Clic sur le bouton overlay = lecture
  overlay.addEventListener("click", () => {
    video.play();
  });

  // Masquer l’overlay quand la vidéo joue
  video.addEventListener("play", () => {
    overlay.classList.add("hidden");
  });

  // Le remettre si la vidéo est mise en pause avant la fin
  video.addEventListener("pause", () => {
    if (video.currentTime < video.duration) {
      overlay.classList.remove("hidden");
    }
  });
}
