import React from 'react';
import styled from 'styled-components';
import { styleList } from 'lib/utils/tagDatabase';

const PostTagB = ({ tag }: { tag: string }) => {
  return (
    <Wrapper style={{ backgroundColor: styleList[tag].color1 }}>
      <div>+</div>
      <div>{`#${tag}`}</div>
    </Wrapper>
  );
};

export default PostTagB;

const Wrapper = styled.div`
  font-size: 18px;
  font-family: 'Roboto', sans-serif;
  padding: 10px 15px;
  color: white;
  border-radius: 20px;
  margin: 2px 3px;
  display: flex;
  align-items: center;
  opacity: 0.7;
  div:nth-child(1) {
    font-size: 24px;
    margin-right: 8px;
  }
  div:nth-child(2) {
    margin-top: 1px;
  }
`;
