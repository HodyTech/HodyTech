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

  // Contact form -> Formspree (async, no page navigation).
  const form = document.getElementById("contact-form");
  const btn = document.getElementById("submit-btn");
  const msg = document.getElementById("form-msg");
  if (form && btn && msg) {
    const label = btn.textContent;
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.textContent = "Sending…";
      msg.className = "";
      msg.textContent = "";
      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" },
        });
        if (!res.ok) throw new Error("Bad response");
        msg.className = "ok";
        msg.textContent = "✓ Message sent — hody will get back to you soon.";
        form.reset();
      } catch {
        msg.className = "err";
        msg.textContent = "✗ Something went wrong. Please try again.";
      } finally {
        btn.disabled = false;
        btn.textContent = label;
      }
    });
  }

  // Reveal-on-scroll for service cards (skipped under reduced motion).
  const revealEls = document.querySelectorAll(".reveal");
  if (!reduced && "IntersectionObserver" in window && revealEls.length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), i * 80);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => obs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
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
