import React from 'react';
import { GiPencil, GiSpellBook, GiPodiumWinner } from 'react-icons/gi';
import styled from 'styled-components';

const iconList: {
  [key: string]: any;
} = {
  스터디: <GiPencil />,
  프로젝트: <GiSpellBook />,
  공모전: <GiPodiumWinner />,
};

const PostCategory = ({ category }: { category: string }) => {
  return (
    <Wrapper>
      {iconList[category]}
      <div>{category}</div>
    </Wrapper>
  );
};

export default PostCategory;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  color: #565656;
  height: 20px;
  font-size: 16px;
  font-family: Cafe24SsurroundAir;
  div {
    margin-top: 2px;
  }
  svg {
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
`;
