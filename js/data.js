// ─── Parsing ───────────────────────────────────────────────────────────────

// "20260221-01.jpg" → { month: "202602", date: "20260221", seq: "01", id: "#20260221-01" }
function parseDateFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/, '');
  const [dateStr, seq] = base.split('-');
  return {
    month: dateStr.slice(0, 6),
    date:  dateStr,
    seq:   seq,
    id:    `#${base}`,
  };
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
