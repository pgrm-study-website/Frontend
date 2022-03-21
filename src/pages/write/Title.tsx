import React from 'react';
import styled from 'styled-components';

const Title = () => {
  return (
    <Wrapper>
      <NameText>제목</NameText>
      <TitleInput placeholder="ex) 자바 스터디 같이 해요~!" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 5px;
`;
const TitleInput = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  border: 0;
  border-bottom: 2px solid gray;
  background-color: #ffffff00;
  padding: 0 5px;
  font-weight: 700;
  font-family: NanumSquareR;
`;

export default Title;
