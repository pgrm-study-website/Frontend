import React from 'react';
import styled from 'styled-components';

const Sidebar = () => {
  return <Wrapper>Sidebar</Wrapper>;
};

export default Sidebar;

const Wrapper = styled.div`
  background-color: #4cbbc2;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: max(0px, calc(50% - 750px));
  display: flex;
  flex-direction: column;
  @media all and (max-width: 1510px) {
    width: 215px;
  }
  @media all and (max-width: 1090px) {
    width: 180px;
  }
  @media all and (max-width: 900px) {
    display: none;
  }
`;
