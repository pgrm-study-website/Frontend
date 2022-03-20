import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import Goyang from 'assets/fonts/Goyang.ttf';
import LeeSeoyun from 'assets/fonts/LeeSeoyun.ttf';
import SUITMedium from 'assets/fonts/SUIT-Medium.ttf';
import SuncheonR from 'assets/fonts/SuncheonR.ttf';
import YUniverseB from 'assets/fonts/YUniverse-B.ttf';
import SignUp from 'pages/SignUp';

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
`;

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/*"
            element={
              <Wrapper>
                <Routes>
                  <Route path="" element={<div>Main</div>} />
                  <Route path="write" element={<div>Write</div>} />
                  <Route path="" element={<div>Not Found</div>} />
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
  width: min(calc(500% / 6), calc(100% - 180px));
  max-width: 1250px;
  height: 100%;
  min-height: 100vh;
  margin-left: max(180px, max(calc(100% / 6), calc(50% - 500px)));
  display: flex;
  flex-direction: column;
  @media all and (max-width: 900px) {
    width: 100%;
    margin-left: 0;
  }
`;
