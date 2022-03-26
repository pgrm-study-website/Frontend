import React from 'react';
import styled from 'styled-components';
import img from 'assets/images/profile.png';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  return (
    <Wrapper>
      <Title>
        <Link to="/">플밍</Link>
      </Title>
      <NotificationContainer>
        {/* 모달로 표시할지, 링크를 옮길지 결정후 정리 */}
        {/* <Link to="/notification"> */}
        <IoIosNotifications />
        {/* </Link> */}
      </NotificationContainer>
      <Profile>
        <img src={img} alt="profile" />
        <Name>seuha516</Name>
      </Profile>
      <LinkContainer>
        <LinkItem to="/mypage">
          <LinkIcon>
            <BsPersonCircle />
          </LinkIcon>
          <LinkText>mypage</LinkText>
        </LinkItem>
        <LinkItem
          //logout 링크 추가 필요
          to="/message"
        >
          <LinkIcon>
            <AiOutlineMessage />
          </LinkIcon>
          <LinkText>message</LinkText>
        </LinkItem>
        <LinkItem
          //logout 링크 추가 필요
          to="/"
        >
          <LinkIcon>
            <AiOutlineLogout />
          </LinkIcon>
          <LinkText>logout</LinkText>
        </LinkItem>
      </LinkContainer>
    </Wrapper>
  );
};

export default Sidebar;
const NotificationContainer = styled.div`
  position: absolute;
  font-size: 20px;
  color: #242424;
  right: 20px;
`;
const Title = styled.div`
  font-size: 50px;
  color: #fff;
`;
const Profile = styled.div`
  color: #242424;
  font-weight: 700;
`;
const LinkContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  color: #242424;
`;
const LinkItem = styled(Link)`
  display: flex;
  height: 30px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;
const LinkText = styled.div`
  width: 100px;
  text-align: left;
`;
const LinkIcon = styled.div`
  width: 40px;
  position: relative;
  top: 4px;
`;
const Name = styled.div`
  font-size: 20px;
  padding: 20px;
`;

const Wrapper = styled.div`
  background-color: #4cbbc2;
  width: 250px;
  height: 100vh;
  position: fixed;
  top: 0;
  left: max(0px, calc(50% - 750px));
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
  padding: 20px;
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
