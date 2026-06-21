// Fernando's Peruvian Rotisserie — small enhancements

// Current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Open / closed status indicator
// Hours: Mon–Thu 06:00–19:00, Fri–Sat 06:00–19:30, Sun 07:00–19:00
(function showOpenStatus() {
  const el = document.getElementById("open-status");
  if (!el) return;

  // Build "now" in Sydney time so it's correct for visitors anywhere.
  const sydneyNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Australia/Sydney" })
  );
  const day = sydneyNow.getDay(); // 0 = Sun ... 6 = Sat
  const minutes = sydneyNow.getHours() * 60 + sydneyNow.getMinutes();

  let openMin = 6 * 60;           // 06:00 default
  let closeMin;
  if (day === 0) { openMin = 7 * 60; closeMin = 19 * 60; }        // Sunday
  else if (day === 5 || day === 6) { closeMin = 19 * 60 + 30; }   // Fri/Sat
  else { closeMin = 19 * 60; }                                    // Mon–Thu

  const isOpen = minutes >= openMin && minutes < closeMin;

  if (isOpen) {
    el.className = "hero-status is-open";
    el.innerHTML = '<span class="dot"></span>Open now — come on in';
  } else {
    el.className = "hero-status is-closed";
    el.innerHTML = '<span class="dot"></span>Closed right now — see hours below';
  }
})();

// Gallery — render photos listed in images/manifest.json.
// Any image that fails to load (file not added yet) is removed gracefully,
// so the gallery only ever shows photos that actually exist.
(async function buildGallery() {
  const grid = document.getElementById("gallery-grid");
  const empty = document.getElementById("gallery-empty");
  if (!grid) return;

  let items = [];
  try {
    const res = await fetch("images/manifest.json", { cache: "no-store" });
    if (res.ok) items = await res.json();
  } catch (e) {
    /* manifest missing — leave gallery empty */
  }

  let shown = 0;
  items.forEach((item) => {
    const fig = document.createElement("figure");
    fig.className = "gallery-item";

    const img = document.createElement("img");
    img.src = "images/" + item.file;
    img.alt = item.alt || "";
    img.loading = "lazy";
    img.onerror = () => fig.remove();      // hide if the file isn't there yet
    img.onload = () => { shown++; };

    fig.appendChild(img);
    grid.appendChild(fig);
  });

  // After a beat, if nothing loaded, show the friendly placeholder note.
  setTimeout(() => {
    if (empty && grid.querySelectorAll(".gallery-item").length === 0) {
      empty.hidden = false;
    }
  }, 1500);
})();
