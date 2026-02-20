// ─── Background layer ──────────────────────────────────────────────────────

// data-bg 속성이 있는 view마다 배경 레이어 자동 주입
document.querySelectorAll('.view[data-bg]').forEach(view => {
  const bg = document.createElement('div');
  bg.className = 'view-bg';
  bg.style.backgroundImage = `url('${view.dataset.bg}')`;
  view.prepend(bg);
});

// date-view 전용: 현재 전시 사진을 배경으로 교체
function setDateViewBg(src) {
  let bg = document.querySelector('#date-view .view-bg');
  if (!bg) {
    bg = document.createElement('div');
    bg.className = 'view-bg';
    document.getElementById('date-view').prepend(bg);
  }
  bg.style.backgroundImage = src ? `url('${src}')` : 'none';
}

// ─── View switching ────────────────────────────────────────────────────────

function showView(id) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ─── Landing ───────────────────────────────────────────────────────────────

document.getElementById('enter-btn').addEventListener('click', () => {
  showView('menu-view');
});

// ─── Menu ──────────────────────────────────────────────────────────────────

document.querySelectorAll('.menu-item').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.target));
});

// ─── Section back buttons ──────────────────────────────────────────────────

document.querySelectorAll('.section-back').forEach(btn => {
  btn.addEventListener('click', () => showView(btn.dataset.target));
});

// ─── Month sidebar ─────────────────────────────────────────────────────────

function renderSidebar() {
  const sidebar = document.getElementById('month-sidebar');
  sidebar.innerHTML = '';

  state.months.forEach((m, i) => {
    const el = document.createElement('span');
    el.className = 'month-tab' + (i === state.monthIndex ? ' active' : '');
    el.textContent = formatMonth(m);
    el.addEventListener('click', () => {
      state.monthIndex = i;
      onMonthChange();
    });
    sidebar.appendChild(el);
  });
}

function moveNextMonth() {
  if (state.monthIndex < state.months.length - 1) {
    state.monthIndex++;
    onMonthChange();
  }
}

function movePrevMonth() {
  if (state.monthIndex > 0) {
    state.monthIndex--;
    onMonthChange();
  }
}

function onMonthChange() {
  renderSidebar();
  updateDatesForMonth();
  renderDateCorridor();
}

// ─── Date corridor ─────────────────────────────────────────────────────────

function updateDatesForMonth() {
  const month  = currentMonth();
  const byDate = groupPhotosByDate(
    state.allPhotos.filter(p => parseDateFromFilename(p.filename).month === month)
  );
  state.dates     = Object.keys(byDate).sort();
  state.dateIndex = 0;
}

function renderDateCorridor() {
  const prevEl = document.querySelector('.date-item.prev');
  const currEl = document.querySelector('.date-item.current');
  const nextEl = document.querySelector('.date-item.next');

  prevEl.textContent = state.dates[state.dateIndex - 1]
    ? formatDate(state.dates[state.dateIndex - 1]) : '';
  currEl.textContent = state.dates[state.dateIndex]
    ? formatDate(state.dates[state.dateIndex]) : '';
  nextEl.textContent = state.dates[state.dateIndex + 1]
    ? formatDate(state.dates[state.dateIndex + 1]) : '';
}

function moveNextDate() {
  if (state.dateIndex < state.dates.length - 1) {
    state.dateIndex++;
    renderDateCorridor();
  }
}

function movePrevDate() {
  if (state.dateIndex > 0) {
    state.dateIndex--;
    renderDateCorridor();
  }
}

// ─── Date view ─────────────────────────────────────────────────────────────

function activeViewId() {
  return document.querySelector('.view.active')?.id || '';
}

function enterDate() {
  const date = currentDate();
  if (!date) return;

  const byDate = groupPhotosByDate(state.allPhotos);
  state.photos     = (byDate[date] || []).slice();
  state.photoIndex = 0;

  const meta = state.photos[0] || {};
  document.querySelector('.date-label').textContent       = formatDate(date);
  document.querySelector('.date-title').textContent       = meta.title || '';
  document.querySelector('.date-description').textContent = meta.description || '';

  const firstPhoto = state.photos[0];
  setDateViewBg(firstPhoto ? `photos/${firstPhoto.filename}` : null);

  renderPhoto();
  showView('date-view');
}

document.querySelector('.date-item.current').addEventListener('click', () => {
  enterDate();
});

// ─── Photo viewer ───────────────────────────────────────────────────────────

function renderPhoto() {
  const photo = currentPhoto();
  if (!photo) return;

  const img  = document.getElementById('current-photo');
  const info = parseDateFromFilename(photo.filename);

  img.classList.add('fading');
  setTimeout(() => {
    img.src = `photos/${photo.filename}`;
    img.alt = info.id;
    document.querySelector('.photo-id').textContent = info.id;
    img.classList.remove('fading');
  }, 240);
}

function moveNextPhoto() {
  if (state.photoIndex < state.photos.length - 1) {
    state.photoIndex++;
    renderPhoto();
  }
}

function movePrevPhoto() {
  if (state.photoIndex > 0) {
    state.photoIndex--;
    renderPhoto();
  }
}

// ─── Keyboard ──────────────────────────────────────────────────────────────

document.addEventListener('keydown', e => {
  const active = activeViewId();

  if (active === 'main-view') {
    if (e.key === 'ArrowRight') moveNextDate();
    if (e.key === 'ArrowLeft')  movePrevDate();
    if (e.key === 'ArrowDown')  moveNextMonth();
    if (e.key === 'ArrowUp')    movePrevMonth();
    if (e.key === 'Enter')      enterDate();
  }

  if (active === 'date-view') {
    if (e.key === 'ArrowRight') moveNextPhoto();
    if (e.key === 'ArrowLeft')  movePrevPhoto();
    if (e.key === 'Escape' || e.key === 'Backspace') showView('main-view');
  }
});

// ─── Swipe (mobile) ────────────────────────────────────────────────────────

let touchStart = { x: 0, y: 0 };

document.addEventListener('touchstart', e => {
  touchStart.x = e.changedTouches[0].clientX;
  touchStart.y = e.changedTouches[0].clientY;
}, { passive: true });

document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStart.x;
  const dy = e.changedTouches[0].clientY - touchStart.y;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 40) return;

  const active = activeViewId();

  if (active === 'main-view') {
    const onSidebar = e.target.closest('#month-sidebar');
    if (onSidebar && Math.abs(dy) > Math.abs(dx)) {
      dy < 0 ? moveNextMonth() : movePrevMonth();
    } else if (!onSidebar && Math.abs(dx) > Math.abs(dy)) {
      dx < 0 ? moveNextDate() : movePrevDate();
    }
  }

  if (active === 'date-view' && Math.abs(dx) > Math.abs(dy)) {
    dx < 0 ? moveNextPhoto() : movePrevPhoto();
  }
}, { passive: true });

// ─── Button wiring ─────────────────────────────────────────────────────────

document.querySelector('.content-nav .nav-prev').addEventListener('click', movePrevDate);
document.querySelector('.content-nav .nav-next').addEventListener('click', moveNextDate);

document.querySelector('.photo-nav .nav-prev').addEventListener('click', movePrevPhoto);
document.querySelector('.photo-nav .nav-next').addEventListener('click', moveNextPhoto);

document.getElementById('back-btn').addEventListener('click', () => showView('main-view'));

// ─── About ─────────────────────────────────────────────────────────────────

fetch('data/about.json')
  .then(r => r.json())
  .then(data => {
    ['geon', 'seungeun'].forEach(key => {
      const el = document.getElementById(`about-${key}`);
      if (!el || !data[key]) return;
      el.querySelector('.about-photo').src    = data[key].photo;
      el.querySelector('.about-name').textContent = data[key].name;
      el.querySelector('.about-bio').textContent  = data[key].bio;
    });
  });

// ─── Init ──────────────────────────────────────────────────────────────────

fetch('data/gallery.json')
  .then(r => r.json())
  .then(data => {
    state.allPhotos = data.sort((a, b) =>
      parseDateFromFilename(a.filename).date.localeCompare(parseDateFromFilename(b.filename).date)
    );

    const byMonth   = groupPhotosByMonth(state.allPhotos);
    state.months    = Object.keys(byMonth).sort();
    state.monthIndex = 0;

    updateDatesForMonth();
    renderSidebar();
    renderDateCorridor();
  });
