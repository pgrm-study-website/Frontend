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
`;
export default SignTemplate;
