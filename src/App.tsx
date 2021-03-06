import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import { changeField, noticeRead } from 'modules/notices';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

import LeeSeoyun from 'assets/fonts/LeeSeoyun.ttf';
import SuncheonR from 'assets/fonts/SuncheonR.ttf';
import NanumSquareR from 'assets/fonts/NanumSquareR.ttf';
import Bazzi from 'assets/fonts/Bazzi.ttf';

import Login from 'pages/users/Login';
import SignUp from 'pages/users/SignUp';
import PwdFind from 'pages/users/PwdFind';
import Sidebar from 'components/sections/Sidebar';
import Header from 'components/sections/Header';
import Footer from 'components/sections/Footer';
import Main from 'pages/main/Main';
import List from 'pages/posts/list/List';
import Write from 'pages/posts/write/Write';
import Read from 'pages/posts/read/Read';
import Mypage from 'pages/mypage/Mypage';
import PwdChange from 'pages/users/PwdChange';
import SignOut from 'pages/users/SignOut';
import Message from 'pages/mypage/Message';
import Notification from 'pages/mypage/Notification';
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
  @font-face { // ????????? (ex. '?????? ??????', '?????? ????????????')
    font-family: LeeSeoyun;
    src: url(${LeeSeoyun}) format("truetype");
  }
  @font-face { // ?????? ????????? (ex. '?????? ??????!')
    font-family: SuncheonR;
    src: url(${SuncheonR}) format("truetype");
  }
  @font-face { // ????????? ?????? ??????
    font-family: NanumSquareR;
    src: url(${NanumSquareR}) format("truetype");
  }
  @font-face { // ??????
    font-family: Bazzi;
    src: url(${Bazzi}) format('truetype');
  }
  @font-face {
    font-family: KOTRAHOPE;  
    font-weight: normal;
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
          <Route path="*" element={<InsideComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

const InsideComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { notice, user } = useSelector((state: RootState) => ({
    notice: state.notices,
    user: state.users.user,
  }));

  useEffect(() => {
    if (user) {
      dispatch(noticeRead());
      dispatch(changeField({ key: 'remove', value: null }));
    }
  }, [location, notice.remove]);

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="login/:social" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="pwd_find" element={<PwdFind />} />
      <Route
        path="*"
        element={
          <Wrapper>
            <Sidebar />
            <ContentWrapper>
              <Header />
              <Routes>
                <Route path="" element={<Main />} />
                <Route path="posts/*">
                  <Route path="" element={<List />} />
                  <Route path="write" element={<Write />} />
                  <Route path=":id" element={<Read />} />
                </Route>
                <Route path="mypage/:nickname" element={<Mypage />} />
                <Route path="pwd_change" element={<PwdChange />} />
                <Route path="signout" element={<SignOut />} />
                <Route path="message/*" element={<Message />} />
                <Route path="notification" element={<Notification />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
            </ContentWrapper>
          </Wrapper>
        }
      />
    </Routes>
  );
};

const Wrapper = styled.div`
  background-color: #f1f1f1;
  width: min(100%, 1500px);
  height: 100%;
  min-height: 100vh;
  margin-left: max(0px, calc(50% - 750px));
  display: flex;
  overflow-x: hidden;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.5s linear;
  overflow: hidden;
`;
