import React from 'react';
import styled from 'styled-components';
interface TrapezoidProps {
  text: string;
}
function Trapezoid({ text }: TrapezoidProps) {
  return (
    <div>
      <TrapezoidBox />
      <TextContainer>
        <span className="page-text text--large">플밍</span>
        <span className="page-text">{text}</span>
      </TextContainer>
    </div>
  );
}
const TrapezoidBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 200px solid transparent;
  border-left: 100vw solid #4cbbc2;
  &::before {
    content: '';
    height: 130px;
    display: block;
  }
`;
const TextContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  font-size: 64px;
  color: #fff;
  .text--large {
    font-size: 100px;
    margin-right: 50px;
  }
`;
export default Trapezoid;
