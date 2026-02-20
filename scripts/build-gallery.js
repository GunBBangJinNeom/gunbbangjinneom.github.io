/**
 * build-gallery.js
 *
 * 사용법: node scripts/build-gallery.js
 *
 * /photos 폴더를 스캔해서 gallery.json의 photos 배열을 자동으로 채워줍니다.
 * title / description은 gallery.json에서 직접 작성하세요.
 * 새로운 날짜 사진을 추가하면 빈 entry가 자동으로 생성됩니다.
 */

const fs   = require('fs');
const path = require('path');

const PHOTOS_DIR   = path.join(__dirname, '../photos');
const GALLERY_PATH = path.join(__dirname, '../data/gallery.json');

// ── 1. /photos 스캔 ────────────────────────────────────────────────────────

const files = fs.readdirSync(PHOTOS_DIR)
  .filter(f => /^\d{8}-\d+\.(png|jpg|jpeg|webp)$/i.test(f))
  .sort();

if (files.length === 0) {
  console.log('⚠  /photos 에 사진이 없습니다.');
  process.exit(0);
}

// 날짜별로 그룹핑
const byDate = {};
files.forEach(f => {
  const date = f.slice(0, 8);
  if (!byDate[date]) byDate[date] = [];
  byDate[date].push(f);
});

// ── 2. 기존 gallery.json 읽기 ──────────────────────────────────────────────

const existing = {};
if (fs.existsSync(GALLERY_PATH)) {
  JSON.parse(fs.readFileSync(GALLERY_PATH, 'utf8'))
    .forEach(e => { existing[e.date] = e; });
}

// ── 3. 병합: photos 자동 채움, 새 날짜는 빈 entry 생성 ──────────────────────

const updated = Object.keys(byDate).sort().map(date => ({
  date,
  title:       existing[date]?.title       ?? '',
  description: existing[date]?.description ?? '',
  photos:      byDate[date],
}));

// ── 4. 저장 ────────────────────────────────────────────────────────────────

fs.writeFileSync(GALLERY_PATH, JSON.stringify(updated, null, 2) + '\n');

console.log(`✓ gallery.json 업데이트 완료 (${updated.length}개 날짜)`);
updated.forEach(e => {
  console.log(`  ${e.date}  ${e.photos.length}장  "${e.title || '← 제목 없음'}"`);
});
