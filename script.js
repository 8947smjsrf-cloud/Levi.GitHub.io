// Her World interactions. Replace the optional audio paths below when you have licensed files.
const audioTracks = {
  // "Your song title": "assets/your-song.mp3"
};

// The photos live in the repository root. Resolve every old placeholder path
// immediately so the images work on GitHub Pages as well as locally.
const photoFallbacks = {
  "personal-photo.jpg": "portrait.jpg",
  "madison-beer.jpg": "hero.jpg",
  "taylor-swift.jpg": "lifestyle.jpg",
  "guns-n-roses.jpg": "founder.jpg",
  "album-artwork.jpg": "hero.jpg",
  "gallery-01.jpg": "portrait.jpg",
  "gallery-02.jpg": "lifestyle.jpg",
  "gallery-03.jpg": "founder.jpg"
};

document.querySelectorAll("img").forEach((image) => {
  const filename = image.getAttribute("src").split("/").pop().split("?")[0];
  const fallback = photoFallbacks[filename];
  if (fallback) image.src = fallback;

  image.addEventListener("error", () => {
    if (!image.dataset.fallbackApplied) {
      image.dataset.fallbackApplied = "true";
      image.src = "hero.jpg";
    }
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const player = document.querySelector(".music-player");
const playButton = document.querySelector("#play-button");
const playIcon = document.querySelector("#play-icon");
const progressBar = document.querySelector("#progress-bar");
const trackTitle = document.querySelector("#track-title");
const trackArtist = document.querySelector("#track-artist");
let isPlaying = false;
let progress = 23;
let progressTimer;

function setTrack(title, artist) {
  trackTitle.textContent = title;
  trackArtist.textContent = artist;
  progress = 23;
  progressBar.style.width = `${progress}%`;
  document.querySelectorAll(".track-row").forEach((row) => row.classList.remove("active"));
}

document.querySelectorAll(".track-row").forEach((row) => {
  row.addEventListener("click", () => {
    setTrack(row.dataset.title, row.dataset.artist);
    row.classList.add("active");
    isPlaying = false;
    player.classList.remove("is-playing");
    playIcon.textContent = "▶";
  });
});

playButton.addEventListener("click", () => {
  isPlaying = !isPlaying;
  player.classList.toggle("is-playing", isPlaying);
  playIcon.textContent = isPlaying ? "Ⅱ" : "▶";
  clearInterval(progressTimer);
  if (isPlaying) {
    progressTimer = setInterval(() => {
      progress = progress >= 100 ? 23 : progress + .45;
      progressBar.style.width = `${progress}%`;
    }, 100);
  }
});

const gardenStage = document.querySelector(".garden-stage");
const tooltip = document.querySelector("#garden-tooltip");

document.querySelectorAll(".flower").forEach((flower) => {
  const showNote = () => {
    tooltip.textContent = flower.dataset.note;
    tooltip.classList.add("visible");
    const stageRect = gardenStage.getBoundingClientRect();
    const flowerRect = flower.getBoundingClientRect();
    tooltip.style.left = `${flowerRect.left - stageRect.left + flowerRect.width / 2 - 75}px`;
    tooltip.style.top = `${flowerRect.top - stageRect.top - 62}px`;
  };
  flower.addEventListener("mouseenter", showNote);
  flower.addEventListener("focus", showNote);
  flower.addEventListener("click", () => {
    showNote();
    window.setTimeout(() => tooltip.classList.remove("visible"), 2800);
  });
  flower.addEventListener("mouseleave", () => tooltip.classList.remove("visible"));
  flower.addEventListener("blur", () => tooltip.classList.remove("visible"));
});

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.addEventListener("pointermove", (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 2;
    const y = (event.clientY / window.innerHeight - .5) * 2;
    document.querySelectorAll(".floating-petal").forEach((petal, index) => {
      const amount = (index + 1) * 3;
      petal.style.translate = `${x * amount}px ${y * amount}px`;
    });
  });
}
