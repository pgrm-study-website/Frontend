import React from 'react';
import styled from 'styled-components';
import Editor from './Editor';

const Wrapper = styled.div`
  background-color: #d6d6d6;
  width: 100%;
  max-width: 1000px;
`;

const Write = () => {
  return (
    <Wrapper>
      <Editor />
    </Wrapper>
  );
};

export default Write;
