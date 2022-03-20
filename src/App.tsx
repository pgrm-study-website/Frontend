import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import { hot } from 'react-hot-loader';

import BeanpoleLight from 'assets/font/Beanpole-Light.ttf';
import Goyang from 'assets/font/Goyang.ttf';
import LeeSeoyun from 'assets/font/LeeSeoyun.ttf';
import SUITMedium from 'assets/font/SUIT-Medium.ttf';
import SuncheonR from 'assets/font/SuncheonR.ttf';
import YUniverseB from 'assets/font/YUniverse-B.ttf';

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
    font-family: Beanpole-Light;
    src: url(${BeanpoleLight}) format("truetype");
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
          <Route path="/" element={<div>Main</div>} />
          <Route path="/login" element={<div>Login</div>} />
          <Route path="/signup" element={<div>Sign Up</div>} />
          <Route path="/write" element={<div>Write</div>} />
          <Route path="/*" element={<div>Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default hot(module)(App);
