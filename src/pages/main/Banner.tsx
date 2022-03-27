import React from 'react';
import styled from 'styled-components';

const Banner = () => {
  return (
    <Wrapper>
      <SmallText>프로그래밍 스터디 모집 사이트</SmallText>
      <LargeText>플밍</LargeText>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  width: 100%;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0 15px;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;

  background: linear-gradient(137deg, #4cbbc2, #166d8f, #22848b, #1b5f62);
  background-size: 400% 400%;
  animation: moving 10s ease infinite;
  @keyframes moving {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
  @media all and (max-width: 700px) {
    flex-direction: column;
  }
`;
const SmallText = styled.div`
  font-size: 27px;
  font-family: SuncheonR;
  line-height: 36px;
  margin-right: 30px;
  text-align: center;
  word-break: keep-all;
  @media all and (max-width: 700px) {
    margin: -5px 0 20px 0;
  }
`;
const LargeText = styled.div`
  font-size: 110px;
  font-family: YUniverse-B;
  margin-top: 5px;
`;
