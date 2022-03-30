import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BiHome } from 'react-icons/bi';

interface TrapezoidProps {
  text: string;
}
function Trapezoid({ text }: TrapezoidProps) {
  return (
    <>
      <FakeTrapezoid />
      <TrapezoidBox />
      <HomeLink to="/">
        <BiHome />
      </HomeLink>
      <TextContainer>
        <span className="page-text text--large">플밍</span>
        <span className="page-text">{text}</span>
      </TextContainer>
    </>
  );
}

const FakeTrapezoid = styled.div`
  width: 100%;
  height: 300px;
  @media screen and (max-width: 1024px) {
    height: 250px;
  }
  @media screen and (max-width: 768px) {
    height: 200px;
  }
`;
const TrapezoidBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 170px;
  background-color: #4cbbc2;
  &:after {
    border-bottom: 0px solid transparent;
    border-left: 0px solid transparent;
    border-right: 100vw solid transparent;
    border-top: 130px solid #4cbbc2;
    content: '';
    position: absolute;
    bottom: -130px;
    left: 0px;
    @media screen and (max-width: 1024px) {
      border-top: 110px solid #4cbbc2;
      bottom: -110px;
    }
    @media screen and (max-width: 768px) {
      border-top: 90px solid #4cbbc2;
      bottom: -90px;
    }
  }
  @media screen and (max-width: 1024px) {
    height: 140px;
  }
  @media screen and (max-width: 768px) {
    height: 110px;
  }
`;
const TextContainer = styled.div`
  position: absolute;
  top: 130px;
  left: 70px;
  font-family: 'Bazzi';
  font-size: 50px;
  color: #fff;
  .text--large {
    font-size: 100px;
    margin: 0 50px 0 0;
  }
  @media screen and (max-width: 1024px) {
    top: 90px;
    left: 55px;
  }
  @media screen and (max-width: 768px) {
    top: 70px;
    left: 45px;
    font-size: 32px;
    .text--large {
      font-size: 80px;
      margin: 0;
      margin-right: 25px;
    }
  }
  @media screen and (max-width: 520px) {
    top: 80px;
    left: 30px;
    font-size: 28px;
    .text--large {
      font-size: 56px;
      margin: 0;
      margin-right: 15px;
    }
  }
`;
const HomeLink = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  svg {
    width: 40px;
    height: 40px;
  }
  color: #ffffffc1;
  transition: color 0.15s linear;
  &:hover {
    color: #ffffff;
  }
  @media screen and (max-width: 1024px) {
    top: 15px;
    left: 15px;
  }
  @media screen and (max-width: 768px) {
    svg {
      width: 30px;
      height: 30px;
    }
  }
`;

export default Trapezoid;
