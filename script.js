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

  const open = 6 * 60;            // 06:00 default
  let openMin = open;
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
