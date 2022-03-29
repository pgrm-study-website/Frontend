import React from 'react';
import styled from 'styled-components';
import dateToString from 'lib/utils/dateToString';

import UserInfo from 'components/common/UserInfo';

const commentItem = ({
  isReply,
  index,
  onClickReply,
}: {
  isReply: boolean;
  index: number;
  onClickReply: (id: number) => void;
}) => {
  return (
    <Wrapper>
      <FirstWrapper>
        <UserInfo userId={123} />
        <DateText>{dateToString(new Date())}</DateText>
      </FirstWrapper>
      <CommentWrapper>
        댓글 Test: Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industrys standard dummy
        text ever since the 1500s, when an unknown printer took a galley of type
        and scrambled it to make a type specimen book. It has survived not only
        five centuries
      </CommentWrapper>
      <ButtonWrapper>
        {!isReply && <div onClick={() => onClickReply(index)}>답글</div>}
        <div onClick={() => alert('삭제 버튼 클릭')}>삭제</div>
      </ButtonWrapper>
    </Wrapper>
  );
};

export default commentItem;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #ffffff;
  margin: 10px 0;
`;
const FirstWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const DateText = styled.div`
  font-size: 15px;
  color: #555555;
  margin: 3px 0 0 10px;
`;
const CommentWrapper = styled.div`
  line-height: normal;
  word-break: break-all;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  color: #555555;
  display: flex;
  justify-content: flex-end;
  div {
    margin-left: 5px;
    cursor: pointer;
  }
`;
