import React from 'react';
import styled from 'styled-components';
interface TrapezoidProps {
  text: string;
}
function Trapezoid({ text }: TrapezoidProps) {
  return (
    <Container>
      <TrapezoidBox />
      <TextContainer>
        <span className="page-text text--large">Plming</span>
        <span className="page-text">{text}</span>
      </TextContainer>
    </Container>
  );
}
const Container = styled.div``;
const TrapezoidBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 170px solid transparent;
  border-left: 100vw solid #4cbbc2;
  &::before {
    content: '';
    height: 130px;
    display: block;
  }
`;
const TextContainer = styled.div`
  position: absolute;
  top: 120px;
  left: 140px;
  font-family: 'Bazzi';
  font-size: 64px;
  color: #fff;
  .text--large {
    font-size: 100px;
    margin-right: 50px;
  }
  /* font-family: 'SuncheonR'; */
  .text--large {
  }
`;
export default Trapezoid;
