import React from 'react';
import styled from 'styled-components';

const ProjectList = () => {
  return (
    <Wrapper>
      <MessageText>프로젝트 목록</MessageText>
    </Wrapper>
  );
};

export default ProjectList;

const Wrapper = styled.div`
  background-color: #e2e2e2;
  width: 100%;
  height: 100%;
  min-height: 800px;
  padding: 25px 20px;
`;
const MessageText = styled.div`
  font-size: 30px;
  font-family: SuncheonR;
`;
