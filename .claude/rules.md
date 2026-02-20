---
name: gs-archive-dev-rules
description: |
  Development rules and coding standards for the GS ARCHIVE project.
  Ensures Claude generates frontend structure, naming, and logic that
  match the project's static museum-style architecture.

model: inherit
---

당신은 GS ARCHIVE 프로젝트의 개발 규칙을 항상 따라야 한다.

이 프로젝트는 정적 전시 웹사이트이며  
모든 코드 제안은 아래 규칙을 벗어나면 안 된다.

---

# 🧱 기술 스택

- Static site
- GitHub Pages
- Vanilla HTML / CSS / JS 기반

서버/DB 기반 아키텍처 제안 금지.

---

# 📂 프로젝트 구조 규칙

/photos
/assets
/css
/js
/data
gallery.json
index.html

---

# 📸 이미지 규칙

파일명:

YYYYMMDD-01.jpg

예:

20260221-01.jpg

절대:

- IMG_1234.jpg 사용 금지
- 날짜 포맷 변경 금지

---

# 🧭 데이터 처리 규칙

이미지 기반 자동 파싱:

- 월: YYYYMM
- 날짜: YYYYMMDD
- 작품번호: #YYYYMMDD-01

JS는 이 규칙을 기준으로 grouping 한다.

---

# 🧠 상태 관리 원칙

허용:

- 현재 월 index
- 현재 날짜 index
- 현재 사진 index

금지:

- 복잡한 상태 관리 라이브러리
- Redux / Zustand / MobX

---

# 🎨 UI 코드 규칙

## 이미지 중심

코드는 항상:

- 이미지가 먼저
- UI는 최소

## 스타일

- 애니메이션 최소
- fade/slight slide만 허용
- bounce / scale 금지

---

# 🧭 네비게이션 규칙

월 → 날짜 → 사진

이 흐름 절대 변경 금지.

---

# 🧪 함수 설계 규칙

함수는 단순하게:

- parseDateFromFilename
- groupPhotosByMonth
- groupPhotosByDate
- moveNextPhoto
- movePrevPhoto

작고 명확하게 유지.

---

# 🧼 코드 스타일

- 과도한 추상화 금지
- class 남용 금지
- functional 중심

---

# 📦 컴포넌트 개념 (Vanilla 기준)

- exhibition-view
- month-view
- date-view
- photo-viewer

DOM 분리 구조 유지.

---

# 🚨 금지 목록

Claude는 절대 제안하면 안 된다:

- 로그인 시스템
- DB
- 이미지 업로드 기능
- 사용자 입력 저장
- 관리자 페이지

---

# 🧠 코드 제안 전 체크

항상 아래 질문 통과해야 한다:

1. 정적으로 동작하는가?
2. GitHub Pages에서 실행 가능한가?
3. 사진 중심 UX를 해치지 않는가?
4. 구조가 단순한가?

YES 아니면 코드 제안 금지.

---

# 🧭 커밋 규칙

- add: photo 20260221
- feat: month swipe
- feat: date viewer
- style: layout spacing
- refactor: grouping logic

---

# 🏁 최종 목표

코드는 눈에 띄면 실패다.

사용자는:

- 사진만 본다
- 시간 흐름만 느낀다

개발 흔적이 느껴지지 않는 웹사이트를 만든다.