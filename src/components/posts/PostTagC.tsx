import React from 'react';
import styled, { css } from 'styled-components';
import { styleList } from 'lib/utils/tagDatabase';

const PostTagC = ({ tag, on }: { tag: string; on: string }) => {
  return (
    <Wrapper
      style={{ backgroundColor: styleList[tag].color1 }}
      on={on}
    >{`# ${tag}`}</Wrapper>
  );
};

export default PostTagC;

const Wrapper = styled.div<{ on: string }>`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  padding: 9px 5px;
  color: white;
  border-radius: 3px;
  margin: 2px;
  text-align: center;
  cursor: pointer;
  ${props =>
    props.on === 'true'
      ? css`
          opacity: 1;
        `
      : css`
          opacity: 0.3;
          filter: contrast(50%);
        `}
`;
