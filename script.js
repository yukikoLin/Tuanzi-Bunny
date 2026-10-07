const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const journey = document.querySelector(".sky-journey");
const skyScene = journey?.querySelector(".scene--sky");

let ticking = false;

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function smoothRange(progress, start, end) {
  const value = clamp((progress - start) / (end - start));
  return value * value * (3 - 2 * value);
}

function clearScrollStyles() {
  [
    "--far-cloud-y",
    "--mid-cloud-y",
    "--front-cloud-y",
    "--far-cloud-opacity",
    "--mid-cloud-opacity",
    "--front-cloud-opacity",
    "--rainbow-opacity",
    "--rainbow-y",
    "--rainbow-scale",
    "--bunny-scroll-y",
    "--bunny-scroll-rotate"
  ].forEach((property) => skyScene?.style.removeProperty(property));
}

function updateSkyJourney() {
  if (!journey || !skyScene) {
    ticking = false;
    return;
  }

  if (reducedMotion.matches) {
    clearScrollStyles();
    ticking = false;
    return;
  }

  const travelDistance = Math.max(journey.offsetHeight - skyScene.offsetHeight, 1);
  const progress = clamp(-journey.getBoundingClientRect().top / travelDistance);

  const frontFade = 1 - smoothRange(progress, 0.3, 0.45);
  const rainbowReveal = smoothRange(progress, 0.15, 0.78);
  const midFade = 1 - smoothRange(progress, 0.6, 0.75);
  const farFade = 1 - 0.48 * smoothRange(progress, 0.75, 1);

  skyScene.style.setProperty("--far-cloud-y", `${-6 * progress}vh`);
  skyScene.style.setProperty("--mid-cloud-y", `${-16 * progress}vh`);
  skyScene.style.setProperty("--front-cloud-y", `${-32 * progress}vh`);
  skyScene.style.setProperty("--far-cloud-opacity", farFade.toFixed(3));
  skyScene.style.setProperty("--mid-cloud-opacity", midFade.toFixed(3));
  skyScene.style.setProperty("--front-cloud-opacity", frontFade.toFixed(3));
  skyScene.style.setProperty("--rainbow-opacity", rainbowReveal.toFixed(3));
skyScene.style.setProperty("--rainbow-y", `${18 * (1 - rainbowReveal)}vh`);

// 彩虹隨 scroll 微微放大，製造靠近感
skyScene.style.setProperty(
  "--rainbow-scale",
  `${0.96 + rainbowReveal * 0.06}`
);

skyScene.style.setProperty("--bunny-scroll-y", `${-12 * progress}px`);
  skyScene.style.setProperty(
    "--bunny-scroll-rotate",
    `${(Math.sin(progress * Math.PI * 2) * 1.2).toFixed(2)}deg`
  );

  ticking = false;
}

function requestSkyUpdate() {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateSkyJourney);
}

window.addEventListener("scroll", requestSkyUpdate, { passive: true });
window.addEventListener("resize", requestSkyUpdate);
reducedMotion.addEventListener("change", requestSkyUpdate);

requestSkyUpdate();
