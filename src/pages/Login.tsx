import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <div>
      <TrapezoidStyle />
    </div>
  );
};

const TrapezoidStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-bottom: 250px solid transparent;
  border-left: 100vw solid #4cbbc2;
  /* border-right: 100vw solid transparent; */
  &::before {
    content: '';
    /* width: 100vw; */
    height: 130px;
    display: block;
  }
`;
export default Login;
