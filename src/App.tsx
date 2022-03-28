import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Goyang from 'assets/fonts/Goyang.ttf';
import LeeSeoyun from 'assets/fonts/LeeSeoyun.ttf';
import SUITMedium from 'assets/fonts/SUIT-Medium.ttf';
import SuncheonR from 'assets/fonts/SuncheonR.ttf';
import YUniverseB from 'assets/fonts/YUniverse-B.ttf';
import MaruBuriLight from 'assets/fonts/MaruBuriLight.ttf';
import NanumSquareR from 'assets/fonts/NanumSquareR.ttf';
import Cafe24SsurroundAir from 'assets/fonts/Cafe24SsurroundAir.ttf';
import Bazzi from 'assets/fonts/Bazzi.ttf';

import Login from 'pages/users/Login';
import SignUp from 'pages/users/SignUp';
import Sidebar from 'components/sections/sidebar/Sidebar';
import Header from 'components/sections/header/Header';
import Footer from 'components/sections/footer/Footer';
import Main from 'pages/main/Main';
import List from 'pages/posts/list/List';
import Write from 'pages/posts/write/Write';
import Read from 'pages/posts/read/Read';
import NotFound from 'components/common/NotFound';

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    img {
      -webkit-user-drag: none;
    }
    a {
      -webkit-user-drag: none;
    }
    select {
      -ms-user-select: none;
      -moz-user-select: -moz-none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      user-select: none;
    }
    strong{
      font-weight: bold;
    }
    em{
      font-style: italic;
    }
    &::-webkit-scrollbar {
      width: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #4f4f4f;
      border-radius: 10px;
      background-clip: padding-box;
      border: 2px solid transparent;
    }
    &::-webkit-scrollbar-track {
      background-color: #929292;
      border-radius: 10px;
      box-shadow: inset 0px 0px 5px white;
    }
  }
  html {
    height: 100%;
  }
  body {
    box-sizing: border-box;
    min-height: 100%;
    line-height: 1;
  }
  #root {
    min-height: 100%;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  @font-face {
    font-family: Goyang;
    src: url(${Goyang}) format("truetype");
  }
  @font-face {
    font-family: LeeSeoyun;
    src: url(${LeeSeoyun}) format("truetype");
  }
  @font-face {
    font-family: SUIT-Medium;
    src: url(${SUITMedium}) format("truetype");
  }
  @font-face {
    font-family: SuncheonR;
    src: url(${SuncheonR}) format("truetype");
  }
  @font-face {
    font-family: YUniverse-B;
    src: url(${YUniverseB}) format("truetype");
  }
  @font-face {
    font-family: MaruBuriLight;
    src: url(${MaruBuriLight}) format("truetype");
  }
  @font-face {
    font-family: NanumSquareR;
    src: url(${NanumSquareR}) format("truetype");
  }
  @font-face {
    font-family: Cafe24SsurroundAir;
    src: url(${Cafe24SsurroundAir}) format("truetype");
  }
  @font-face {
    font-family: 'Bazzi';
    src: url(${Bazzi}) format('truetype');

}@font-face {
    font-family: 'KOTRAHOPE';  font-weight: normal;
  font-style: normal;
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRAHOPE.woff2') format('woff2');
}
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="*"
            element={
              <Wrapper>
                <Sidebar />
                <Header />
                <Routes>
                  <Route path="" element={<Main />} />
                  <Route path="posts/*">
                    <Route path="" element={<List />} />
                    <Route path="write" element={<Write />} />
                    <Route path=":id" element={<Read />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
              </Wrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  background-color: #f1f1f1;
  width: 1250px;
  height: 100%;
  min-height: 100vh;
  margin-left: calc(50% - 500px);
  display: flex;
  flex-direction: column;
  align-items: center;
  @media all and (max-width: 1510px) {
    width: calc(100% - 215px);
    margin-left: 215px;
  }
  @media all and (max-width: 1090px) {
    width: calc(100% - 180px);
    margin-left: 180px;
  }
  @media all and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
  }
`;
