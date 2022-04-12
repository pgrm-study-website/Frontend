import React from 'react';
import { useDispatch } from 'react-redux';
import { BsPencil } from 'react-icons/bs';
import styled from 'styled-components';
import { postInputType } from 'lib/api/posts';

const WriteButton = ({
  post,
  loading,
}: {
  post: postInputType;
  loading: boolean;
}) => {
  const dispatch = useDispatch();

  const onClick = () => {
    alert('글쓰기' + JSON.stringify(post)); //글쓰기 dispatch
  };

  return loading ? (
    <div>loading</div>
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
