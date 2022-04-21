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
    } else if (post.content === '') {
      alert('내용을 입력해 주세요.');
    } else if (post.tagIds.length === 0) {
      alert('태그가 최소 1개 필요합니다.');
    } else {
      if (post.id) {
        const id = post.id;
        const data = post;
        data.id = undefined;
        dispatch(update({ id, data }));
      } else {
        dispatch(write({ ...post }));
      }
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
