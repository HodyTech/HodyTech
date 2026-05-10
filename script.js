// hody.tech — small enhancements only. No dependencies.
(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Hide the broken-image icon if the logo file isn't present yet.
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("error", () => {
      logo.style.visibility = "hidden";
      const slot = logo.closest(".logo-slot");
      if (slot) slot.dataset.empty = "true";
    });
  }

  // Subtle parallax on the neon glow blobs (pointer only, skipped if reduced motion).
  if (reduced) return;
  const glow = document.querySelector(".glow");
  if (!glow) return;

  let raf = 0;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const onMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    targetX = x * 12;
    targetY = y * 12;
    if (!raf) raf = requestAnimationFrame(tick);
  };

  const tick = () => {
    currentX += (targetX - currentX) * 0.08;
    currentY += (targetY - currentY) * 0.08;
    glow.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
    if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
      raf = requestAnimationFrame(tick);
    } else {
      raf = 0;
    }
  };

  window.addEventListener("pointermove", onMove, { passive: true });
})();
