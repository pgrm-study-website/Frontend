import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IoIosNotifications } from 'react-icons/io';
import { BsPersonCircle } from 'react-icons/bs';
import NotificationList from './notification/NotificationModal';

const Header = () => {
  const [user, setUser] = useState(123);
  const [notificationOpen, SetnotificationOpen] = useState(false);
  const handleNofiticationClick = () => {
    SetnotificationOpen(!notificationOpen);
  };
  const messageDummyData = [
    {
      id: 10,
      content: '000에 댓글이 달렸습니다',
      date: '2022.03.30',
    },
    {
      id: 11,
      date: '2022.03.30',
      content: '000 스터디에 가입이 되었습니다',
    },
    {
      id: 12,
      date: '2022.03.30',
      content: '000님에게 쪽지가 왔습니다 "안녕하세요..."',
    },
  ];
  return (
    <>
      <Wrapper>
        <Title>
          <Link to="/">Plming</Link>
        </Title>
        <IconContainer>
          <Notification>
            <IoIosNotifications onClick={handleNofiticationClick} />
            <NotificationModal open={notificationOpen}>
              <NotificationList data={messageDummyData} />
            </NotificationModal>
          </Notification>
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

const NotificationModal = styled.div<{ open: boolean }>`
  position: absolute;
  background-color: #fff;
  width: 300px;
  border-radius: 5px;
  padding: 15px;
  right: 0;
  height: fit-content;
  color: #242424;
  font-size: 18px;
  transition: opacity 0.5s;
  opacity: ${props => (props.open ? '1' : '0')};
  pointer-events: ${props => (props.open ? 'auto' : 'none')};
`;
const Notification = styled.div`
  cursor: pointer;
  position: relative;
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
  font-family: NanumSquareR;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;

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
