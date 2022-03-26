import React from 'react';
import styled from 'styled-components';

import UserInfo from 'components/common/UserInfo';

const Participant = ({
  participantNum,
  participantMax,
}: {
  participantNum: number;
  participantMax: number;
}) => {
  return (
    <Wrapper>
      <NameText>참가 신청하기</NameText>
      <ContentWrapper>
        <UserWrapper>
          <UserInfoText>{`${participantNum}명이 이 팀에 참가를 신청했어요!`}</UserInfoText>
          <UserInfoWrapper>
            <UserInfo userId={1} />
            <UserInfo userId={-1} />
            <UserInfo userId={-1} />
          </UserInfoWrapper>
        </UserWrapper>
        <SubmitWrapper>
          <MessageInput placeholder="???님의 팀에 참가하고 싶어요!" />
          <SubmitButton>신청하기</SubmitButton>
        </SubmitWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Participant;

const Wrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  padding: 30px 20px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #4cbbc21c;
  height: 360px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 10px;
`;
const ContentWrapper = styled.div`
  display: flex;
  height: calc(100% - 40px);
`;
const UserWrapper = styled.div`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const UserInfoText = styled.div`
  font-family: NanumSquareR;
  font-size: 18px;
  margin: 20px 0 12px 0;
`;
const UserInfoWrapper = styled.div`
  width: 100%;
  height: 210px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  & > div + div {
    margin-top: 10px;
  }
  background-color: #00000008;
  border-radius: 10px;
`;
const SubmitWrapper = styled.div`
  width: calc(100% - 320px);
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MessageInput = styled.textarea`
  width: 100%;
  height: 200px;
  font-size: 18px;
  padding: 10px;
  margin-top: 15px;
  font-family: NanumSquareR;
  line-height: 24px;
  border: none;
  resize: none;
  background-color: #ffffff6e;
  border-radius: 10px;
`;
const SubmitButton = styled.div`
  width: 100px;
  margin-top: 15px;
  text-align: center;
  font-size: 24px;
  font-family: Cafe24SsurroundAir;
  font-weight: 700;
  color: #646464;
  cursor: pointer;
  transition: color 0.15s linear;
  &:hover {
    color: black;
  }
`;
