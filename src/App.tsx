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

import Login from 'pages/Login';
import Main from 'pages/main/Main';

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
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>Sign Up</div>} />
          <Route
            path="/*"
            element={
              <Wrapper>
                <Routes>
                  <Route path="" element={<Main />} />
                  <Route path="write" element={<div>Write</div>} />
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
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
  background-color: #323232;
  width: 1250px;
  height: 100%;
  min-height: 100vh;
  margin-left: calc(50% - 500px);
  display: flex;
  flex-direction: column;
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
