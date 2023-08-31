## 만스타그램
소셜 네트워크 서비스의 주요 기능을 리액트JS + 파이어베이스 서버리스로 구현하였습니다.

## Link
https://manstagram.vercel.app/

## Libraries
- react v18.2
- react-dom v18.2
- react-router-dom v6.14
- react-icons v4
- react-spinners
- recoil
- tailwindcss v3
- firebase v10 (Auth, Stoage, Database)

## Deploy
Vercel

## Features
사용자 인증(로그인, 로그아웃), 구글 로그인, 사용자 CRUD, 게시물 CRUD,
댓글 CRUD, 사용자 검색, 좋아요, fetch 중 로딩 처리

## Roadmap
게시물 페이징 처리, 무한 스크롤, 권한별 라우팅 제어, PWA

## Architecture
![image](https://github.com/keemkeeman/manstagram/assets/82154123/f9a3a9cb-0372-4789-a0ff-070ca6175142)
- vercel로 배포(CI, CD)
- 백엔드 파이어베이스 서버리스
- 이미지는 storage, 회원/게시물/댓글은 firestore에 저장
