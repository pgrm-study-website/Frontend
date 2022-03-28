import React, { useState } from 'react';
import styled from 'styled-components';
import img from 'assets/images/profile.png';
import { BsPersonCircle } from 'react-icons/bs';
import { AiOutlineLogout } from 'react-icons/ai';
import { IoIosNotifications } from 'react-icons/io';
import { AiOutlineMessage } from 'react-icons/ai';
import { FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <Wrapper>
      <Button onClick={() => setOpen(!open)}>
        <FaBars />
      </Button>
      <Container open={open}>
        <Title>
          <Link to="/">Plming</Link>
        </Title>
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
          <Item>
            <LinkIcon>
              <IoIosNotifications />
            </LinkIcon>
            <LinkText>notification</LinkText>
          </Item>
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
      </Container>
    </Wrapper>
  );
};

export default Sidebar;
const Button = styled.button`
  background-color: #4cbbc2;

  border: none;
  width: fit-content;
`;
const Container = styled.div<{ open: boolean }>`
  transform: ${props => (props.open ? 'translateX(0)' : 'translateX(-200px) ')};
  transition: all 1s;
`;
const Title = styled.div`
  font-family: 'Bazzi';
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
const Item = styled.div`
  display: flex;
  height: 30px;
  align-items: center;
  font-size: 20px;
  justify-content: center;
`;
const LinkText = styled.div`
  width: 100px;
  text-align: left;
`;
const LinkIcon = styled.div`
  width: 40px;
  position: relative;
  top: 2px;
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
  font-family: 'KOTRAHOPE';
  gap: 20px;
  padding: 20px;
  font-weight: normal;
  font-style: normal;
  overflow: hidden;
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
