import React from 'react';
import styled from 'styled-components';
import { styleList } from 'lib/utils/tagDatabase';

const PostTagA = ({ tag }: { tag: string }) => {
  return (
    <Wrapper
      style={{ backgroundColor: styleList[tag].color1 }}
    >{`#${tag}`}</Wrapper>
  );
};

export default PostTagA;

const Wrapper = styled.div`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  color: white;
  border-radius: 3px;
  margin: 2px;
`;
