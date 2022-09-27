# 트렐로 만들기

이 문서는 아주 편리한 간트차트 툴인 트렐로의 일부 기능을 클론코딩 합니다.


## 주의사항

- React에 대해서 자세히 다루진 않습니다. Props drilling을 통한 트렐로 구현을 진행합니다.
- NextJS의 타입스크립트(typescript) 템플릿을 이용하여 프로젝트를 구성합니다.
- 라이브러리 사용을 통해서 최대한 빠른 서비스 개발에 초점을 맞춥니다.


## 사전지식

- [트렐로](https://trello.com/)가 어떤 툴인지 알아야합니다.
    ![images](./images/1.png)
- [javascript](https://developer.mozilla.org/ko/docs/Web/JavaScript)에 대해서 알아야 합니다.
- [NPM(Node Packge Manager)](https://namu.wiki/w/npm)에 대해서 알아야합니다.
- [React](https://ko.reactjs.org/)가 어떤 라이브러리인지 알아야합니다.
- [Github](https://github.com/)의 계정이 필요합니다.


## 강의 순서
1. 현재 레포를 fork
2. [vscode](https://code.visualstudio.com/docs/setup/mac) 설치
3. node와 npm 설치([NVM](https://github.com/nvm-sh/nvm))
4. npm을 이용한 라이브러리 설치
   1. CRA(create-react-app)을 이용한 리액트 프로젝트 구성
   2. CNA(create-next-app)을 이용한 NextJS 프로젝트 구성
5. React Component 만들기
   1. import와 export를 하는 방법
   2. Class Component 와 Functional Component의 차이
   3. React-hook의 이해
   4. Component Styling 하기
6. 스타일링을 도와 줄 [Chakra-ui](https://chakra-ui.com/) 설치
   1. Box를 사용하는 방법(3-1의 Styling을 해보기)
7. 트렐로 모양 만들기
   1. Section 만들기
   2. Secion안에 들어가는 Task Card 만들기
   3. TaskCard 클릭시 보여줄 Modal 만들기
8. 과제 안내
   1. 토요일 자정까지 트렐로 만들기
      1. Section, Card, Modal, Checklist


## 도움?

- [리액트 교과서 - React 컴포넌트와 상태객체](https://velog.io/@kyusung/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EA%B5%90%EA%B3%BC%EC%84%9C-React-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8%EC%99%80-%EC%83%81%ED%83%9C-%EA%B0%9D%EC%B2%B4)
- [핑프 - 나무위키](https://namu.wiki/w/%ED%95%91%EA%B1%B0%20%ED%94%84%EB%A6%B0%EC%84%B8%EC%8A%A4)
- [좋코딩 - 질문](https://youtu.be/vf24tP_G_HY?t=389)