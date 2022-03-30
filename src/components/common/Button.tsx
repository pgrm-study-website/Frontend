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
  padding: 12px 10px 10px 8px;
  font-size: 20px;
  width: 100%;
  cursor: pointer;
  font-family: NanumSquareR;

  &.btn--grey {
    background-color: #848484; //임의 지정
    color: #fff;
    border-radius: 5px;
    &:hover {
      transition: all 0.3s;
      filter: brightness(80%);
    }
  }
`;

export default Button;
