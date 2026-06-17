/* ============================================
   카카오톡 공유 (Kakao JavaScript SDK)
   ============================================
   사용 전:
   1) https://developers.kakao.com 에서 앱 등록
   2) JavaScript 키를 아래 KAKAO_JS_KEY에 입력
   3) 플랫폼 → Web → 사이트 도메인에 GitHub Pages 주소 등록
      예) https://<username>.github.io
   4) 페이지를 GitHub Pages에 올린 뒤 OG_URL, OG_IMAGE_URL을
      절대경로(https://...)로 바꾸면 카톡 미리보기가 더 안정적
   ============================================ */

const KAKAO_JS_KEY = '2655aa86b0569db990cacf3ad6015f34';       // ← 발급받은 JS 키
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.kanghun.hermitcrab';
const PAGE_URL = window.location.href;               // 현재 다운로드 페이지 URL
const SHARE_IMAGE = new URL('../img/preview1.png', document.currentScript.src).href;

// SDK 초기화 (한 번만)
if (window.Kakao && !Kakao.isInitialized()) {
  try {
    Kakao.init(KAKAO_JS_KEY);
  } catch (e) {
    console.warn('[Kakao] init 실패:', e);
  }
}

function shareToKakao() {
  if (!window.Kakao || !Kakao.isInitialized()) {
    alert('카카오 SDK가 아직 로드되지 않았어요. 잠시 후 다시 시도해 주세요.');
    return;
  }
  if (KAKAO_JS_KEY === 'YOUR_KAKAO_JS_KEY_HERE') {
    alert('카카오 JS 키가 설정되지 않았습니다.\nassets/js/kakao-share.js 파일을 수정해 주세요.');
    return;
  }

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '나의 작은 소라게 키우기',
      description: '귀여운 소라게를 키우며 힐링하세요 🦀',
      imageUrl: SHARE_IMAGE,
      link: {
        mobileWebUrl: PAGE_URL,
        webUrl: PAGE_URL,
      },
    },
    buttons: [
      {
        title: '앱 다운로드',
        link: {
          mobileWebUrl: PLAY_STORE_URL,
          webUrl: PLAY_STORE_URL,
        },
      },
      {
        title: '소개 페이지',
        link: {
          mobileWebUrl: PAGE_URL,
          webUrl: PAGE_URL,
        },
      },
    ],
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('kakaoShareBtn');
  if (btn) btn.addEventListener('click', shareToKakao);
});
