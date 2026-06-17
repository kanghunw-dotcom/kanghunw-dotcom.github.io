# 나의 작은 소라게 키우기 · 다운로드 페이지

GitHub Pages에 올려서 카톡으로 공유할 수 있는 정적 랜딩 페이지입니다.

## 폴더 구조

```
promo/
├── index.html              # 메인 페이지 (섹션: 히어로 / 영상 / 스크린샷)
├── README.md               # 이 문서
└── assets/
    ├── css/style.css       # 디자인. 색/간격/폰트 수정은 여기 :root 변수로
    ├── js/kakao-share.js   # 카카오 공유 로직. JS 키만 바꾸면 됨
    ├── img/                # 로고, 스크린샷
    └── video/intro.mp4     # 소개 영상
```

수정 시 자주 건드릴 위치:
- **문구/버튼 텍스트** → `index.html`
- **색/여백/폰트** → `assets/css/style.css` 상단 `:root`
- **공유 카드 제목/이미지** → `assets/js/kakao-share.js` 안 `content`

---

## 1단계 — 카카오 JavaScript 키 발급

이미 카카오 개발자 계정이 있으니, **새 앱만 하나 추가**하면 됩니다.

1. https://developers.kakao.com → 로그인
2. **내 애플리케이션 → 애플리케이션 추가하기**
   - 앱 이름: `나의 작은 소라게 키우기` (자유)
   - 회사 이름: 본인/Two in Soft
   - 앱 아이콘: `assets/img/logo.png` 업로드
3. 생성 후 **앱 키 → JavaScript 키** 복사
4. `promo/assets/js/kakao-share.js` 파일 상단
   ```js
   const KAKAO_JS_KEY = 'YOUR_KAKAO_JS_KEY_HERE';
   ```
   ← 따옴표 안에 붙여넣기

## 2단계 — 플랫폼 도메인 등록

JS 키는 **등록된 도메인에서만** 동작합니다.

1. 카카오 개발자 콘솔 → 만든 앱 → **앱 설정 → 플랫폼**
2. **Web 플랫폼 등록**
3. 사이트 도메인에 GitHub Pages 주소 입력 (예시)
   ```
   https://<github-username>.github.io
   ```
   - 사용자 페이지 1개로 여러 레포 쓰면 위 도메인 하나로 충분
   - 커스텀 도메인을 쓰면 그 도메인도 추가

## 3단계 — GitHub Pages 배포

방법 A · **별도 레포로** (가장 간단)

1. 깃허브에 새 레포 만들기 (예: `hermitcrab-promo`, public)
2. `promo/` 폴더 안의 파일들을 레포 루트에 push
   ```bash
   cd promo
   git init
   git add .
   git commit -m "init landing page"
   git branch -M main
   git remote add origin https://github.com/<USERNAME>/hermitcrab-promo.git
   git push -u origin main
   ```
3. 레포 → **Settings → Pages**
   - Branch: `main`, Folder: `/ (root)` → Save
4. 1~2분 뒤 `https://<USERNAME>.github.io/hermitcrab-promo/` 로 열림

방법 B · **사용자 페이지로** (도메인이 `<username>.github.io` 가 됨)

- 레포 이름을 `<USERNAME>.github.io` 로 만들고 같은 방식으로 push
- 주소: `https://<USERNAME>.github.io/`

## 4단계 — 카톡 미리보기 이미지 안정화 (선택)

배포 후 페이지 주소가 정해지면 `index.html` 상단의 OG 메타태그를 절대경로로 바꾸면, 카카오/페이스북/슬랙 등 어디서 링크를 펴도 미리보기가 깨지지 않습니다.

```html
<meta property="og:image" content="https://<USERNAME>.github.io/hermitcrab-promo/assets/img/preview1.png">
<meta property="og:url"   content="https://<USERNAME>.github.io/hermitcrab-promo/">
```

카카오는 미리보기 이미지를 캐시하므로, 이미지를 바꿔도 바로 반영이 안 됩니다. 그럴 땐 **카카오 캐시 초기화**:
- https://developers.kakao.com/tool/clear/og
- 페이지 URL 입력 → 캐시 삭제

## 5단계 — 로컬 미리보기

`promo/` 폴더에서:

```bash
python -m http.server 8000
```

브라우저로 http://localhost:8000 열어서 확인.

> 카톡 공유 버튼은 **카카오에 등록된 도메인**에서만 동작합니다. 로컬(`localhost:8000`)을 테스트하려면 카카오 콘솔 플랫폼에 `http://localhost:8000` 도 같이 등록해 두면 편합니다.

---

## 자주 쓰는 수정

| 바꾸고 싶은 것 | 파일 / 위치 |
|---|---|
| 페이지 제목/태그라인 | `index.html` `.hero-title`, `.hero-tagline` |
| 다운로드 버튼 링크 | `index.html` `.btn-primary` href + `kakao-share.js` `PLAY_STORE_URL` |
| 카톡 카드 제목/설명 | `kakao-share.js` `content.title`, `content.description` |
| 카톡 카드 썸네일 | `assets/img/preview1.png` 교체 또는 `kakao-share.js` `SHARE_IMAGE` |
| 색 테마 | `assets/css/style.css` 상단 `:root` |
| 스크린샷 추가 | `assets/img/`에 파일 추가 → `index.html` `.gallery` 안에 `<figure>` 복붙 |
