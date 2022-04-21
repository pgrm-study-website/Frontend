import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillReplyFill, BsArrowsCollapse } from 'react-icons/bs';
import { commentType } from 'lib/api/comments';
import dateToString from 'lib/utils/dateToString';
import reverseArray from 'lib/utils/reverseArray';
import { remove } from 'modules/posts/comments';
import styled, { css } from 'styled-components';

import UserInfo from 'components/common/UserInfo';

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
      <MainComment
        comment={comment}
        index={index}
        onClickReply={onClickReply}
        userId={userId}
        fold={fold ? -1 : comment.recommentSize}
        setFold={setFold}
      />
      {fold &&
        reverseArray(comment.recomment).map(i => (
          <ReplyWrapper>
            <BsFillReplyFill />
            <MainComment
              comment={i}
              index={-1}
              onClickReply={onClickReply}
              userId={userId}
              fold={-1}
              setFold={setFold}
            />
          </ReplyWrapper>
        ))}
      {fold && (
        <FoldWrapper2 onClick={() => setFold(false)}>
          <BsArrowsCollapse />
          <div>답글 접기</div>
        </FoldWrapper2>
      )}
    </>
  );
};

const MainComment = ({
  comment,
  index,
  onClickReply,
  userId,
  fold,
  setFold,
}: {
  comment: any;
  index: number;
  onClickReply: any;
  userId: number;
  fold: number;
  setFold: any;
}) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      dispatch(remove(comment.id));
    }
  };

  if (comment.deleteYn === '1') {
    return (
      <Wrapper isReply={index < 0}>
        <CommentWrapper>삭제된 댓글입니다.</CommentWrapper>
        <ButtonWrapper hasFold={fold > 0}>
          {fold > 0 ? (
            <FoldWrapper onClick={() => setFold(true)}>
              <AiOutlinePlus />
              <div>{`${comment.recommentSize}개의 답글`}</div>
            </FoldWrapper>
          ) : (
            <div />
          )}
          <EtcWrapper>
            {index >= 0 && userId >= 0 && (
              <div onClick={() => onClickReply(index)}>답글</div>
            )}
          </EtcWrapper>
        </ButtonWrapper>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper isReply={index < 0}>
        <FirstWrapper>
          <UserInfo userId={comment.userId} />
          <DateText>{dateToString(comment.createDate)}</DateText>
        </FirstWrapper>
        <CommentWrapper>{comment.content}</CommentWrapper>
        <ButtonWrapper hasFold={fold > 0}>
          {fold > 0 ? (
            <FoldWrapper onClick={() => setFold(true)}>
              <AiOutlinePlus />
              <div>{`${comment.recommentSize}개의 답글`}</div>
            </FoldWrapper>
          ) : (
            <div />
          )}
          <EtcWrapper>
            {index >= 0 && userId >= 0 && (
              <div onClick={() => onClickReply(index)}>답글</div>
            )}
            {userId === comment.userId && <div onClick={onRemove}>삭제</div>}
          </EtcWrapper>
        </ButtonWrapper>
      </Wrapper>
    );
  }
};

export default CommentItem;

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
const ButtonWrapper = styled.div<{ hasFold: boolean }>`
  width: 100%;
  margin-top: 5px;
  color: #555555;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${props =>
    props.hasFold &&
    css`
      height: 34px;
      margin-top: 15px;
      align-items: flex-end;
    `}
`;
const FoldWrapper = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #23b5b5;
  color: white;
  svg {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
  font-size: 18px;
  font-family: NanumSquareR;
  div {
    margin-bottom: -2px;
  }
  cursor: pointer;
  transition: background-color 0.15s linear;
  &:hover {
    background-color: #6cc7c7;
  }
`;
const EtcWrapper = styled.div`
  display: flex;
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
const FoldWrapper2 = styled.div`
  width: calc(100% - 35px);
  margin: 0 0 0 35px;
  padding: 10px;
  border-radius: 10px;
  background-color: #bfd7d7;
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
    background-color: #dbe7e7;
  }
`;
