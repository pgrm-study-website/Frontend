import React from 'react';
import styled from 'styled-components';

function Trapezoid() {
  return <TrapezoidBox />;
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

export default Trapezoid;
