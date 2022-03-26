import React from 'react';
import styled from 'styled-components';

const Title = ({ title }: { title: string }) => {
  return <Wrapper>{title}</Wrapper>;
};

export default Title;

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  font-size: 40px;
  font-family: NanumSquareR;
`;
