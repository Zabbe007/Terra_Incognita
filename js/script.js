// ── Image Gallery ──
if (document.getElementById("lightbox")) {

  const items    = Array.from(document.querySelectorAll(".gallery-item"));
  const lightbox = document.getElementById("lightbox");
  const lbImg    = document.getElementById("lightboxImg");
  const lbTitle  = document.getElementById("lightboxTitle");
  const lbTag    = document.getElementById("lightboxTag");
  let current    = 0;
  let visible    = items; // tracks which items are currently shown after filtering

  // Filter buttons
  document.querySelectorAll(".gallery-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".gallery-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      items.forEach(item => {
        const show = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("hidden", !show);
      });
      visible = items.filter(i => !i.classList.contains("hidden"));
    });
  });

  // Open lightbox
  function openLightbox(index) {
    current = index;
    const item = visible[current];
    lbImg.src   = item.querySelector("img").src;
    lbImg.alt   = item.querySelector("img").alt;
    lbTitle.textContent = item.dataset.title;
    lbTag.textContent   = item.dataset.region;
    lightbox.classList.add("open");
  }

  items.forEach(item => {
    item.addEventListener("click", () => {
      visible = items.filter(i => !i.classList.contains("hidden"));
      openLightbox(visible.indexOf(item));
    });
  });

  // Prev / Next buttons
  document.getElementById("lightboxPrev").addEventListener("click", (e) => {
    e.stopPropagation();
    current = (current - 1 + visible.length) % visible.length;
    openLightbox(current);
  });
  document.getElementById("lightboxNext").addEventListener("click", (e) => {
    e.stopPropagation();
    current = (current + 1) % visible.length;
    openLightbox(current);
  });

  // Close
  document.getElementById("lightboxClose").addEventListener("click", () => lightbox.classList.remove("open"));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("open"); });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "ArrowRight") document.getElementById("lightboxNext").click();
    if (e.key === "ArrowLeft")  document.getElementById("lightboxPrev").click();
    if (e.key === "Escape")     lightbox.classList.remove("open");
  });
}


// ── Alien Runner Animation ──
if (document.querySelector(".unknown-land")) {

  const alien = document.getElementById('alien-runner');
  const trigger = document.querySelector('a.unknown-land');

  trigger.addEventListener('click', (e) => {
    e.preventDefault();

    // If already running, ignore the click
    if (alien.classList.contains('running')) return;

    // Start the run
    alien.classList.add('running');

    // When animation ends, reset so it can be triggered again
    alien.addEventListener('animationend', () => {
      alien.classList.remove('running');
    }, { once: true });
  });
}