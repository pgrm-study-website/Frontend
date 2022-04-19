import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import { list } from 'modules/posts/comments';
import { commentType } from 'lib/api/comments';
import reverseArray from 'lib/utils/reverseArray';
import styled from 'styled-components';

import { LoadingBox } from 'components/common/Loading';
import CommentItem from 'components/comments/CommentItem';
import CommentInput from 'components/comments/CommentInput';

const Comment = ({ id }: { id: number }) => {
  const dispatch = useDispatch();

  const { comments, reload, user } = useSelector(
    ({ comments, users }: RootState) => ({
      comments: comments.comments,
      reload: comments.reload,
      user: users.user,
    }),
  );
  const [reply, setReply] = useState(-1);

  useEffect(() => {
    dispatch(list(id));
  }, [reload]);

  const onClickReply = (id: number) => setReply(reply !== id ? id : -1);

  if (!comments) {
    return (
      <div style={{ width: '100%', height: '300px' }}>
        <LoadingBox r="100px" />
      </div>
    );
  } else {
    return (
      <Wrapper>
        <NameText>{`댓글 ${
          comments.reduce(
            (accumulator, current) => accumulator + current.recommentSize,
            0,
          ) + comments.length
        }개`}</NameText>
        {reverseArray(comments).map((i: commentType, idx: number) => (
          <div key={idx}>
            <CommentItem
              comment={i}
              index={idx}
              onClickReply={onClickReply}
              userId={user ? user.id : -999}
            />
            {user && reply === idx && <CommentInput id={id} parentId={i.id} />}
          </div>
        ))}
        {user && <CommentInput id={id} parentId={null} />}
      </Wrapper>
    );
  }
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
