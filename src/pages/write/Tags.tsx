import React from 'react';
import styled from 'styled-components';
import * as TagDatabase from 'lib/utils/TagDatabase';

const Tags = () => {
  return (
    <Wrapper>
      <NameText>태그</NameText>
      <TagBox></TagBox>
      <input />
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 12px;
`;
const TagBox = styled.div`
  width: 100%;
  height: 30px;
  background-color: black;
`;
