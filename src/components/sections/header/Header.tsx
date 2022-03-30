import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { BsPersonCircle } from 'react-icons/bs';

const Header = () => {
  const [user, setUser] = useState(123);
  return (
    <>
      <Wrapper>
        <Title>
          <Link to="/">Plming</Link>
        </Title>
        <IconContainer>
          <Notification />
          <Link to={`/mypage/${user}`}>
            <BsPersonCircle />
          </Link>
        </IconContainer>
      </Wrapper>
      <FakeHeader />
    </>
  );
};

export default Header;
const Notification = styled(IoIosNotifications)`
  cursor: pointer;
`;
const IconContainer = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  gap: 20px;
`;
const Title = styled.div`
  font-family: 'Bazzi';
  font-size: 50px;
  color: #fff;
`;
const Wrapper = styled.div`
  background-color: #4cbbc2; //임시
  width: 100%;
  height: 75px; //들어갈 내용에 따라 변동 가능
  display: none;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
}

  @media all and (max-width: 900px) {
    /* display: block; //or flex */
    display: flex;
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
