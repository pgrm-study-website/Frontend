import React from 'react';
import styled from 'styled-components';
import Banner from './Banner';
import Category from './Category';
import Editor from './Editor';
import Tags from './Tags';
import Title from './Title';

const Write = () => {
  return (
    <Wrapper>
      <Banner />
      <Title />
      <Category />
      <Editor />
      <Tags />
    </Wrapper>
  );
};

export default Write;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 50px 20px;
`;
