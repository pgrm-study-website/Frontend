import React from 'react';
import styled from 'styled-components';
import Editor from './Editor';

const Wrapper = styled.div`
  background-color: #d6d6d6;
  width: 100%;
  max-width: 1200px;
  margin-left: max(0px, calc(50% - 600px));
  height: 100%;
  min-height: 100vh;
`;

const Write = () => {
  return (
    <Wrapper>
      ㅇㅇ
      <Editor />
    </Wrapper>
  );
};

export default Write;
