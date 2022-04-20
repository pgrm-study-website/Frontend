import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsFillReplyFill, BsArrowsCollapse } from 'react-icons/bs';
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
          fold={fold ? -1 : comment.recommentSize}
          setFold={setFold}
        />
      ) : (
        <DeletedMainComment
          isReply={false}
          index={index}
          onClickReply={onClickReply}
        />
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
                fold={-1}
                setFold={setFold}
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
  isReply,
  index,
  onClickReply,
  userId,
  fold,
  setFold,
}: {
  comment: any;
  isReply: boolean;
  index: number;
  onClickReply: (id: number) => void;
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

  return (
    <Wrapper isReply={isReply}>
      <FirstWrapper>
        <UserInfo userId={comment.userId} />
        <DateText>{dateToString(comment.createDate)}</DateText>
      </FirstWrapper>
      <CommentWrapper>{comment.content}</CommentWrapper>
      <ButtonWrapper>
        {fold > 0 && (
          <FoldWrapper onClick={() => setFold(true)}>
            <AiOutlinePlus />
            <div>{`${comment.recommentSize}개의 답글`}</div>
          </FoldWrapper>
        )}
        <EtcWrapper>
          {!isReply && <div onClick={() => onClickReply(index)}>답글</div>}
          {userId && <div onClick={onRemove}>삭제</div>}
        </EtcWrapper>
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
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: #5bdbdb;
  color: white;
  margin-top: -5px;
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
const EtcWrapper = styled.div`
  display: flex;
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
  justify-content: space-between;
  align-items: center;
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
