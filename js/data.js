// ─── Parsing ───────────────────────────────────────────────────────────────

// "20260221-01.jpg" → { month: "202602", date: "20260221", seq: "01" }
function parseDateFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, '');   // strip extension
  const [dateStr, seq] = base.split('-');
  return {
    month: dateStr.slice(0, 6),
    date:  dateStr,
    seq:   seq,
    id:    `#${base}`,
  };
}

// ─── Grouping ──────────────────────────────────────────────────────────────

// photos array → { "202602": [...entries], "202603": [...entries] }
function groupPhotosByMonth(photos) {
  return photos.reduce((acc, photo) => {
    const { month } = parseDateFromFilename(photo.filename);
    if (!acc[month]) acc[month] = [];
    acc[month].push(photo);
    return acc;
  }, {});
}

// photos array → { "20260221": [...entries], "20260228": [...entries] }
function groupPhotosByDate(photos) {
  return photos.reduce((acc, photo) => {
    const { date } = parseDateFromFilename(photo.filename);
    if (!acc[date]) acc[date] = [];
    acc[date].push(photo);
    return acc;
  }, {});
}

// ─── Format helpers ────────────────────────────────────────────────────────

// "202602" → "2026.02"
function formatMonth(yyyymm) {
  return `${yyyymm.slice(0, 4)}.${yyyymm.slice(4, 6)}`;
}

// "20260221" → "2026.02.21"
function formatDate(yyyymmdd) {
  return `${yyyymmdd.slice(0, 4)}.${yyyymmdd.slice(4, 6)}.${yyyymmdd.slice(6, 8)}`;
}
