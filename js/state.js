// ─── State ─────────────────────────────────────────────────────────────────

const state = {
  monthIndex: 0,     // 현재 월 index
  dateIndex:  0,     // 현재 날짜 index (현재 월 기준)
  photoIndex: 0,     // 현재 사진 index (현재 날짜 기준)

  months:  [],       // ["202602", "202603", ...]
  dates:   [],       // ["20260214", "20260221", ...] (현재 월 기준)
  photos:  [],       // ["20260221-01.jpg", ...] (현재 날짜 기준, 파일명 문자열)

  gallery: [],       // gallery.json 원본 배열
};

// ─── Derived getters ───────────────────────────────────────────────────────

function currentMonth() { return state.months[state.monthIndex]; }
function currentDate()  { return state.dates[state.dateIndex]; }
function currentPhoto() { return state.photos[state.photoIndex]; }
