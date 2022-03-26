import React from 'react';
import styled from 'styled-components';

import CommentItem from 'components/comments/CommentItem';
import CommentInput from 'components/comments/CommentInput';

const Comment = () => {
  return (
    <Wrapper>
      <NameText>댓글 4개</NameText>
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
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
