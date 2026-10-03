const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const parallaxItems = [...document.querySelectorAll("[data-parallax]")];

let ticking = false;

function updateParallax() {
  const scrollY = window.scrollY;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    item.style.setProperty("--parallax-y", `${scrollY * speed}px`);
  });

  ticking = false;
}

function requestParallaxUpdate() {
  if (reducedMotion.matches || ticking) return;
  ticking = true;
  window.requestAnimationFrame(updateParallax);
}

window.addEventListener("scroll", requestParallaxUpdate, { passive: true });
window.addEventListener("resize", requestParallaxUpdate);

if (!reducedMotion.matches) updateParallax();
