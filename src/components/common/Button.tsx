import React, { ReactNode } from 'react';
import styled from 'styled-components';
interface ButtonProps {
  value: string;
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset' | undefined; //기본 submit
  className?: string;
}
function Button({ type, value, children, className }: ButtonProps) {
  return (
    <ButtonBox type={type} value={value} className={className}>
      {children}
    </ButtonBox>
  );
}
const ButtonBox = styled.button`
  border: none;
  padding: 10px;
  font-size: 20px;
  width: 100%;
  /* height: 40px; */

  &.btn--grey {
    background-color: #848484; //임의 지정
    color: #fff;
    border-radius: 5px;
  }
`;

export default Button;
