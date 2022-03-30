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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: #484848;
  background-color: #eee;
  font-family: 'SuncheonR';

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
export default SignTemplate;
