import React from 'react';
import styled from 'styled-components';

const Header = () => {
  return (
    <>
      <Wrapper>Header</Wrapper>
      <FakeHeader />
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  background-color: #bde8ff; //임시
  width: 100%;
  height: 75px; //들어갈 내용에 따라 변동 가능
  display: none;
  @media all and (max-width: 900px) {
    display: block; //or flex
    position: fixed;
    top: 0;
    left: 0;
  }
  z-index: 100;
`;
const FakeHeader = styled.div`
  //Header의 position이 fixed이기 때문에 필요한 공간 차지용 div
  width: 100%;
  height: 75px; //진짜 Header와 동일하게
  display: none;
  @media all and (max-width: 900px) {
    display: block;
  }
`;
