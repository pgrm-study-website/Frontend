import styled from 'styled-components';
import React, { ReactNode } from 'react';

interface SignTemplateProps {
  children?: ReactNode;
}
function SignTemplate({ children }: SignTemplateProps) {
  return <Template>{children}</Template>;
}

const Template = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  color: #484848;
  background-color: #eee;
  font-family: 'SuncheonR';
  position: relative;
  overflow-x: hidden;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;

export default SignTemplate;
