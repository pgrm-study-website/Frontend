import React from 'react';
import { useDispatch } from 'react-redux';
import { BsPencil } from 'react-icons/bs';
import { writeRequestType } from 'lib/api/posts';
import { write, update } from 'modules/posts/writePosts';
import styled from 'styled-components';

import { LoadingComponent } from 'components/common/Loading';

const WriteButton = ({
  post,
  loading,
}: {
  post: writeRequestType & { id?: number };
  loading: boolean;
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    if (post.title === '') {
      alert('제목을 입력해 주세요.');
      return;
    }
    if (post.content === '') {
      alert('내용을 입력해 주세요.');
      return;
    }
    if (post.tagIds.length === 0) {
      alert('태그가 최소 1개 필요합니다.');
      return;
    }
    if (post.participantNum && post.participantMax) {
      if (post.participantMax < post.participantNum) {
        alert('현재 참가 인원보다 최대 인원을 적게 바꿀 수 없습니다.');
        return;
      } else if (post.participantMax === post.participantNum) {
        if (
          !window.confirm(
            `현재 참가 인원 수가 ${post.participantNum}명이므로, 수정 후에 바로 마감됩니다.\n마감 후에는 글을 수정할 수 없습니다.\n정말 수정하시겠습니까?`,
          )
        ) {
          return;
        }
      }
    }

    if (post.id) {
      const id = post.id;
      const data = post;
      data.id = undefined;
      data.userId = undefined;
      data.participantNum = undefined;
      dispatch(update({ id, data }));
    } else {
      dispatch(write({ ...post }));
    }
  };

  return loading ? (
    <Wrapper>
      <LoadingComponent r="60px" />
    </Wrapper>
  ) : (
    <Wrapper onClick={onClick}>
      <BsPencil />
      <div>Write</div>
    </Wrapper>
  );
};

export default WriteButton;

const Wrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  font-family: 'Hurricane', cursive;
  svg {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  cursor: pointer;
  color: #626262;
  transition: color 0.15s linear;
  &:hover {
    color: #000000;
  }
`;
