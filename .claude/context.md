---
name: gs-archive-context
description: |
  Persistent project context for the GS ARCHIVE website.
  This skill ensures Claude always understands the design philosophy,
  UX structure, data rules, and development constraints of the project.

model: inherit
---

당신은 GS ARCHIVE 웹사이트 프로젝트의 컨텍스트를 항상 기억해야 한다.

이 프로젝트는 단순한 사진 웹사이트가 아니라  
"디지털 전시관(Museum-style Archive)"이다.

모든 응답은 아래 설계 원칙을 절대 벗어나지 않는다.

---

# 🏛 프로젝트 개요

GS ARCHIVE는 두 사람의 시간을 기록하는  
정적 기반의 전시 웹사이트다.

- 앨범 ❌
- 블로그 ❌
- 포트폴리오 ❌
- 전시관 ⭕

목표:
시간이 쌓이는 아카이브 경험.

---

# 🎨 디자인 철학

## 핵심 키워드
- museum
- silence
- minimal
- archive
- time flow

## 금지
- 화려한 애니메이션
- 컬러 UI
- 장식적 요소
- SNS 스타일 피드

## 유지해야 하는 느낌
- 조용함
- 여백
- 중앙 집중
- 작품 중심

---

# 🖼 레이아웃 원칙

## 중앙 고정 이미지

- 이미지 = 화면 중심
- 테두리 없음
- 그림자 없음
- 주변은 여백
- 배경: #111 ~ #181818

인스타 웹 게시물처럼  
"사진만 떠 있는 구조"

---

# 🧭 UX 동선

## 구조

Exhibition (월 스와이프)
→ Month Room
→ Date Room (핵심)
→ Photo Viewer

---

## Exhibition

- 월 단위 스와이프
- 과거 → 최신 방향
- 오른쪽이 미래

---

## Month Room

- 날짜 스와이프

---

## Date Room

고정 요소:

- 날짜
- title
- description

변하는 요소:

- 사진만 스와이프

---

# 🖼 Date Room 상세

구조:

DATE
Title
Description

[중앙 사진]

← #YYYYMMDD-01 →

설명은 사진이 바뀌어도 고정.

---

# 📂 데이터 규칙

## 사진 위치

/photos

## 파일명

YYYYMMDD-01.jpg

예:

20260221-01.jpg

## 자동 생성

월:
YYYYMM

날짜:
YYYYMMDD

작품번호:
#YYYYMMDD-01

---

# 🧠 시간 흐름 원칙

정렬:

과거 → 최신

이 방향은 절대 바꾸지 않는다.

---

# 🧱 개발 제약

## 정적 기반

- GitHub Pages
- 서버 없음
- DB 없음

## 금지

- 로그인
- 업로드 기능
- 동적 저장

---

# 🧩 프론트엔드 원칙

- UI는 사진을 방해하면 안 된다.
- 인터랙션은 최소화한다.
- 스와이프는 가로 이동만 사용한다.
- 전환은 fade/slight slide만 허용한다.

---

# 🧪 백엔드/데이터 원칙

실제 백엔드는 없음.

데이터는:

- 파일명
- 정적 JSON

으로만 관리한다.

---

# ✍️ 텍스트 스타일

## Title

짧고 감정 과하지 않게.

예:

IKEA Afternoon
Walk in the rain

## Description

최대 3줄.

시처럼.

설명보다 기록.

---

# 🚨 항상 지켜야 할 것

이 프로젝트는  
"예쁜 웹사이트"가 아니라

"시간의 전시"

이다.

모든 제안은 다음 질문을 통과해야 한다:

1. 전시 느낌을 해치지 않는가?
2. 조용한가?
3. 단순한가?
4. 사진이 주인공인가?

하나라도 아니면 제안하지 않는다.