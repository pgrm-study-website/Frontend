import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillReplyFill } from 'react-icons/bs';
import dateToString from 'lib/utils/dateToString';
import { commentType } from 'lib/api/comments';
import { remove } from 'modules/posts/comments';
import styled, { css } from 'styled-components';

import UserInfo from 'components/common/UserInfo';
import reverseArray from 'lib/utils/reverseArray';

const CommentItem = ({
  comment,
  index,
  onClickReply,
  userId,
}: {
  comment: commentType;
  index: number;
  onClickReply: (id: number) => void;
  userId: number;
}) => {
  const [fold, setFold] = useState(false);

  return (
    <>
      {comment.deleteYn === '0' ? (
        <MainComment
          comment={comment}
          isReply={false}
          index={index}
          onClickReply={onClickReply}
          userId={userId}
        />
      ) : (
        <DeletedMainComment
          isReply={false}
          index={index}
          onClickReply={onClickReply}
        />
      )}
      {!fold && comment.recommentSize > 0 && (
        <FoldWrapper onClick={() => setFold(true)}>
          <AiOutlinePlus />
          <div>{`답글 ${comment.recommentSize}개 더보기`}</div>
        </FoldWrapper>
      )}
      {fold &&
        reverseArray(comment.recomment).map(i => (
          <ReplyWrapper>
            <BsFillReplyFill />
            {i.deleteYn === '0' ? (
              <MainComment
                comment={i}
                isReply={true}
                index={-1}
                onClickReply={onClickReply}
                userId={userId}
              />
            ) : (
              <DeletedMainComment
                isReply={true}
                index={-1}
                onClickReply={onClickReply}
              />
            )}
          </ReplyWrapper>
        ))}
    </>
  );
};

const MainComment = ({
  comment,
  isReply,
  index,
  onClickReply,
  userId,
}: {
  comment: any;
  isReply: boolean;
  index: number;
  onClickReply: (id: number) => void;
  userId: number;
}) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      dispatch(remove(comment.id));
    }
  };

  return (
    <Wrapper isReply={isReply}>
      <FirstWrapper>
        <UserInfo userId={comment.userId} />
        <DateText>{dateToString(comment.createDate)}</DateText>
      </FirstWrapper>
      <CommentWrapper>{comment.content}</CommentWrapper>
      <ButtonWrapper>
        {!isReply && <div onClick={() => onClickReply(index)}>답글</div>}
        {userId && <div onClick={onRemove}>삭제</div>}
      </ButtonWrapper>
    </Wrapper>
  );
};

const DeletedMainComment = ({
  isReply,
  index,
  onClickReply,
}: {
  isReply: boolean;
  index: number;
  onClickReply: (id: number) => void;
}) => {
  return (
    <Wrapper isReply={isReply}>
      <CommentWrapper style={{ color: '#464646', width: '200px' }}>
        삭제된 댓글입니다.
      </CommentWrapper>
      <ButtonWrapper>
        {!isReply && <div onClick={() => onClickReply(index)}>답글</div>}
      </ButtonWrapper>
    </Wrapper>
  );
};

export default CommentItem;

const FoldWrapper = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #edffff;
  margin-top: -5px;
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  cursor: pointer;
  transition: background-color 0.15s linear;
  &:hover {
    background-color: #d9fdfd;
  }
`;
const Wrapper = styled.div<{ isReply: boolean }>`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #ffffff;
  margin: 10px 0;
  ${props =>
    props.isReply &&
    css`
      background-color: #f9f9f9;
      margin-top: -50px;
    `}
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
  margin-top: 5px;
  div {
    margin-left: 5px;
    cursor: pointer;
  }
`;
const ReplyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  & > svg {
    width: 30px;
    height: 30px;
    margin: 0 5px 0 0;
    transform: rotate(180deg);
  }
  & > div {
    width: calc(100% - 35px);
    margin: 0 0 5px 0;
  }
`;
