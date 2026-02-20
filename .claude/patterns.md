---
name: gs-archive-ui-patterns
description: |
  UI interaction and layout patterns for GS ARCHIVE.
  Ensures Claude generates museum-style navigation,
  swipe interactions, and layout behavior consistent
  with the project's exhibition UX.

model: inherit
---

당신은 GS ARCHIVE의 UI 설계 패턴을 항상 기억해야 한다.

이 프로젝트의 UI는 "웹앱"이 아니라  
"디지털 전시 공간"이다.

모든 UI 제안은 전시 동선 기반으로만 이루어진다.

---

# 🧭 전체 UI 흐름

Exhibition → Month → Date → Photo

이 흐름은 절대 변경하지 않는다.

---

# 🏛 Exhibition 패턴 (월 복도)

## 동작

- 좌/우 스와이프
- ← → 키 이동

## 구조

화면 중앙:

2026.02

하단:

3 dates on view

UI 최소화.

썸네일 금지.
카드 디자인 금지.

텍스트 기반 전시 복도.

---

# 🏛 Month 패턴 (날짜 복도)

월 안으로 들어가면:

날짜 패널들이 가로로 이어진다.

예:

2026.02.14 → 2026.02.21 → 2026.02.28

좌/우 스와이프만 허용.

세로 스크롤 금지.

---

# 🏛 Date Room 패턴 (핵심)

이 공간은 "전시실"이다.

구조:

DATE
TITLE
DESCRIPTION

[ 중앙 고정 이미지 ]

← #YYYYMMDD-01 →

---

# 🖼 Photo Viewer 패턴

이미지:

- 중앙 고정
- 테두리 없음
- 그림자 없음
- 주변 여백 큼

전환:

- 가로 슬라이드
- fade 200~300ms

절대 금지:

- zoom 애니메이션
- bounce
- scale transition

---

# 🧠 텍스트 고정 규칙

Date Room에서는:

Title / Description은 고정.

사진이 바뀌어도 변경되지 않는다.

이것은 "그날 전시 설명"이기 때문이다.

---

# 📱 모바일 패턴

모바일에서도 동일 구조.

허용:

- swipe left/right

금지:

- pinch zoom 제스처
- vertical gallery scroll

---

# 🧩 인터랙션 계층

1. 월 이동
2. 날짜 이동
3. 사진 이동

항상 바깥 → 안쪽.

계층 스킵 금지.

---

# 🎛 UI 요소 규칙

버튼:

- 텍스트 버튼만
- 얇은 스타일

아이콘:

- 최소
- 기능 설명용만

금지:

- floating button
- 강조된 CTA

---

# 🌫 전시 분위기 유지

UI는 사용자를 안내하지 않는다.

공간이 안내한다.

예:

- 화살표는 작게
- 안내문 최소
- 텍스트 적게

---

# 🧪 UI 제안 전 체크

Claude는 UI 제안 전에 항상 확인한다:

1. 전시 동선이 유지되는가?
2. 사진이 중심인가?
3. 인터랙션이 단순한가?
4. 여백이 충분한가?

하나라도 아니면 UI 제안 금지.

---

# 🚨 금지 UI 패턴

- SNS 피드 구조
- Masonry layout
- 카드 그리드
- infinite scroll
- 모달 남용
- sidebar navigation 확장

---

# 🏁 목표 UX

사용자는:

- 스크롤하지 않는다.
- 소비하지 않는다.
- 이동한다.

웹사이트가 아니라  
전시 공간을 걷는 경험.

Claude는 이 목표를 항상 유지해야 한다.