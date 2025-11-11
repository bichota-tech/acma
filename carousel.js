// Vanilla carousel 
(function () {
  const root = document.getElementById('mycarousel');
  if (!root) return;

  const trackWrapper = document.createElement('div');
  trackWrapper.className = 'carousel-track';
  // move existing .carousel-inner > .carousel-item into .carousel-track
  const inner = root.querySelector('.carousel-inner');
  const items = Array.from(inner.querySelectorAll('.carousel-item'));
  items.forEach(item => trackWrapper.appendChild(item));
  inner.appendChild(trackWrapper);

  const indicators = Array.from(root.querySelectorAll('.carousel-indicators button'));
  const prevBtn = root.querySelector('.carousel-control-prev');
  const nextBtn = root.querySelector('.carousel-control-next');

  let index = items.findIndex(i => i.classList.contains('active'));
  if (index < 0) index = 0;
  const total = items.length;
  const interval = 4000;
  let timer = null;
  let isHover = false;
  let isAnimating = false;

  function goTo(i, instant = false) {
    if (isAnimating) return;
    i = (i + total) % total;
    index = i;
    // update transform
    const track = root.querySelector('.carousel-track');
    const translateX = -100 * index;
    if (instant) {
      track.style.transition = 'none';
      track.style.transform = `translateX(${translateX}%)`;
      requestAnimationFrame(() => {
        track.style.transition = '';
      });
    } else {
      isAnimating = true;
      track.style.transform = `translateX(${translateX}%)`;
      setTimeout(() => { isAnimating = false; }, 650); // slightly > transition
    }

    // update active classes
    items.forEach((el, idx) => el.classList.toggle('active', idx === index));
    indicators.forEach((btn, idx) => btn.classList.toggle('active', idx === index));
  }

  function next() { goTo(index + 1); }
  function prev() { goTo(index - 1); }

  // attach indicator events
  indicators.forEach((btn, idx) => {
    btn.addEventListener('click', () => goTo(idx));
  });

  // attach controls
  if (nextBtn) nextBtn.addEventListener('click', e => { e.preventDefault(); next(); restartTimer(); });
  if (prevBtn) prevBtn.addEventListener('click', e => { e.preventDefault(); prev(); restartTimer(); });

  // autoplay
  function startTimer() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => { if (!isHover) next(); }, interval);
  }
  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function restartTimer() { stopTimer(); startTimer(); }

  // pause on hover
  root.addEventListener('mouseenter', () => { isHover = true; });
  root.addEventListener('mouseleave', () => { isHover = false; });

  // touch swipe (mobile)
  (function attachSwipe() {
    let startX = 0, delta = 0, threshold = 40;
    const track = root.querySelector('.carousel-track');
    root.addEventListener('touchstart', (e) => { startX = e.touches[0].clientX; stopTimer(); }, {passive: true});
    root.addEventListener('touchmove', (e) => {
      delta = e.touches[0].clientX - startX;
      // small drag effect:
      if (Math.abs(delta) > 6) {
        track.style.transition = 'none';
        const percent = (-index * 100) + (delta / root.clientWidth) * 100;
        track.style.transform = `translateX(${percent}%)`;
      }
    }, {passive: true});
    root.addEventListener('touchend', () => {
      track.style.transition = '';
      if (Math.abs(delta) > threshold) {
        if (delta < 0) next(); else prev();
      } else {
        goTo(index); // snap back
      }
      delta = 0;
      restartTimer();
    });
  })();

  // init position
  goTo(index, true);
  startTimer();

  // demo-btns delegación (opcional)
  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.demo-btn');
    if (!btn) return;
    const demo = btn.dataset.demo;
    if (demo) {
      // aquí puedes añadir navegación o lógica para abrir demo modal
      console.log('Demo click:', demo);
    }
  });
})();
