import React from 'react';
import { GiPencil, GiSpellBook, GiPodiumWinner } from 'react-icons/gi';
import styled from 'styled-components';

const iconList = [
  { name: '스터디', icon: <GiPencil /> },
  { name: '프로젝트', icon: <GiSpellBook /> },
  { name: '공모전', icon: <GiPodiumWinner /> },
];

const PostCategory = ({ category }: { category: number }) => {
  return (
    <Wrapper>
      {iconList[category].icon}
      <div>{iconList[category].name}</div>
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
