import React, { useState } from 'react';
import { BsFillReplyFill } from 'react-icons/bs';
import styled from 'styled-components';

import CommentItem from 'components/comments/CommentItem';
import CommentInput from 'components/comments/CommentInput';

const Comment = () => {
  const [reply, setReply] = useState(-1);

  const onClickReply = (id: number) => setReply(id);

  return (
    <Wrapper>
      <NameText>댓글 4개</NameText>
      {[1, 2, 3, 4].map((i, idx) => (
        <div key={idx}>
          <CommentItem
            isReply={false}
            index={idx}
            onClickReply={onClickReply}
          />
          <ReplyWrapper>
            <BsFillReplyFill />
            <CommentItem
              isReply={true}
              index={idx}
              onClickReply={onClickReply}
            />
          </ReplyWrapper>
          {reply === idx && (
            <ReplyWrapper>
              <BsFillReplyFill />
              <CommentInput parentId={i} />
            </ReplyWrapper>
          )}
        </div>
      ))}
      <CommentInput parentId={null} />
    </Wrapper>
  );
};

export default Comment;

const Wrapper = styled.div`
  width: 100%;
  margin-top: 40px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 20px;
`;
const ReplyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & > svg {
    width: 30px;
    height: 30px;
    margin: 0 5px 10px 0;
    transform: rotate(180deg);
  }
  & > div {
    width: calc(100% - 35px);
  }
`;
