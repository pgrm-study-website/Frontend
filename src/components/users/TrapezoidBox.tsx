import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';

interface TrapezoidProps {
  text: string;
}
function Trapezoid({ text }: TrapezoidProps) {
  return (
    <Container>
      <TrapezoidBox />

      <TextContainer>
        <HomeLink to="/">
          <BiHome />
        </HomeLink>

        <span className="page-text text--large">플밍</span>
        <span className="page-text">{text}</span>
      </TextContainer>
    </Container>
  );
}
const HomeLink = styled(Link)`
  position: relative;
  color: #fff;
  font-size: 50px;
  bottom: 5px;
`;
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
  left: 50px;
  font-family: 'Bazzi';
  font-size: 64px;
  color: #fff;
  .text--large {
    font-size: 100px;
    margin: 0 50px;
  }
`;
export default Trapezoid;
