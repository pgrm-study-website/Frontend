import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiOutlineLogout,
  AiOutlineMessage,
  AiOutlineLogin,
} from 'react-icons/ai';
import {
  BsFillCaretLeftFill,
  BsPersonCircle,
  BsPencilSquare,
} from 'react-icons/bs';
import { IoIosNotifications } from 'react-icons/io';
import { RootState } from 'modules';
import { logout } from 'modules/users';
import styled, { css } from 'styled-components';

import NotificationModal from './notification/NotificationModal';

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

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NotificationWrapperRef = useRef<HTMLDivElement>(null);
  const user = useSelector((state: RootState) => state.users.user);
  const [open, setOpen] = useState(true);
  const [notificationOpen, setNotificationOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        NotificationWrapperRef.current &&
        !NotificationWrapperRef.current.contains(e.target as Node)
      ) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [NotificationWrapperRef]);

  return (
    <>
      <FakeSidebar open={open} />
      <FoldIcon open={open} onClick={() => setOpen(!open)}>
        <BsFillCaretLeftFill />
      </FoldIcon>
      <Wrapper open={open}>
        {user ? (
          <>
            <Title>
              <Link to="/">Plming</Link>
            </Title>
            <Profile>
              <img
                src={user.image || require('assets/images/defaultProfile.png')}
                alt="profile"
              />
              <Name>{user.nickname}</Name>
            </Profile>
            <LinkContainer>
              <LinkItem to={`/mypage/${user.nickname}`}>
                <LinkIcon>
                  <BsPersonCircle />
                </LinkIcon>
                <LinkText>mypage</LinkText>
              </LinkItem>
              <LinkItem to="/message">
                <LinkIcon>
                  <AiOutlineMessage />
                </LinkIcon>
                <LinkText>message</LinkText>
              </LinkItem>
              <Item ref={NotificationWrapperRef}>
                <LinkIcon
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  <IoIosNotifications />
                </LinkIcon>
                <LinkText
                  onClick={() => setNotificationOpen(!notificationOpen)}
                >
                  notification
                </LinkText>
                <Notification open={notificationOpen}>
                  {notificationOpen && (
                    <NotificationModal data={messageDummyData} />
                  )}
                </Notification>
              </Item>
              <LinkItem to="/posts/write">
                <LinkIcon>
                  <BsPencilSquare />
                </LinkIcon>
                <LinkText>write</LinkText>
              </LinkItem>
              <Item>
                <LinkIcon>
                  <AiOutlineLogout />
                </LinkIcon>
                <LinkText
                  onClick={() => {
                    if (window.confirm('로그아웃 하시겠습니까?')) {
                      dispatch(logout());
                      navigate('/');
                    }
                  }}
                >
                  logout
                </LinkText>
              </Item>
            </LinkContainer>
          </>
        ) : (
          <>
            <Title style={{ marginBottom: '50px' }}>
              <Link to="/">Plming</Link>
            </Title>
            <LinkContainer>
              <LinkItem to="/login">
                <LinkIcon>
                  <AiOutlineLogin />
                </LinkIcon>
                <LinkText>login</LinkText>
              </LinkItem>
              <LinkItem to="/signup" style={{ marginTop: '10px' }}>
                <LinkIcon>
                  <AiOutlineLogin />
                </LinkIcon>
                <LinkText>signup</LinkText>
              </LinkItem>
            </LinkContainer>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Sidebar;

const FakeSidebar = styled.div<{ open: boolean }>`
  background-color: black;
  width: 100%;
  max-width: ${props => (props.open ? '250px' : '0px')};
  height: 100vh;
  @media all and (max-width: 1510px) {
    max-width: ${props => (props.open ? '215px' : '0px')};
  }
  @media all and (max-width: 1090px) {
    max-width: ${props => (props.open ? '180px' : '0px')};
  }
  @media all and (max-width: 900px) {
    display: none;
  }
  transition: max-width 0.2s linear;
`;
const FoldIcon = styled.div<{ open: boolean }>`
  z-index: 50;
  position: fixed;
  top: calc(0vh);
  left: ${props =>
    props.open
      ? 'calc(max(0px, calc(50% - 750px)) + 232px)'
      : 'max(0px, calc(50% - 750px))'};
  @media all and (max-width: 1510px) {
    left: ${props =>
      props.open
        ? 'calc(max(0px, calc(50% - 750px)) + 197px)'
        : 'max(0px, calc(50% - 750px))'};
  }
  @media all and (max-width: 1090px) {
    left: ${props =>
      props.open
        ? 'calc(max(0px, calc(50% - 750px)) + 162px)'
        : 'max(0px, calc(50% - 750px))'};
  }
  @media all and (max-width: 900px) {
    display: none;
  }

  width: 0px;
  height: 60px;
  border-left: none;
  border-right: 18px solid #ffffff88;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  cursor: pointer;
  svg {
    width: 18px;
    height: 18px;
    margin: 12px 0 0 1px;
    color: #00000099;
    &:hover {
      color: #000000;
    }
  }

  ${props =>
    !props.open
      ? css`
          border-right: 18px solid#38d3d3c7;
          transform: rotateY(180deg);
        `
      : css`
          animation: appear 1s;
        `};

  @keyframes appear {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
const Wrapper = styled.div<{ open: boolean }>`
  background-color: #4cbbc2;
  width: ${props => (props.open ? '250px' : '0px')};
  height: 100vh;
  position: fixed;
  top: 0;
  left: max(0px, calc(50% - 750px));
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 25px;
  padding: ${props => (props.open ? '20px' : '20px 0px')};
  font-family: 'KOTRAHOPE';
  font-weight: normal;
  font-style: normal;
  overflow: ${props => (props.open ? 'visible' : 'hidden')};

  transition: width 0.2s linear, padding 0.2s linear;
  z-index: 10;
  @media all and (max-width: 1510px) {
    width: ${props => (props.open ? '215px' : '0px')};
  }
  @media all and (max-width: 1090px) {
    width: ${props => (props.open ? '180px' : '0px')};
  }
  @media all and (max-width: 900px) {
    display: none;
  }

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const Title = styled.div`
  font-family: 'Bazzi';
  font-size: 50px;
  color: #fff;
`;
const Profile = styled.div`
  color: #242424;
  font-weight: 700;
  img {
    width: 125px;
    height: 125px;
    object-fit: cover;
    border-radius: 125px;
    border: 3px solid black;
    background-color: white;
  }
`;
const Name = styled.div`
  font-size: 25px;
  padding: 20px 0;
`;
const LinkContainer = styled.div`
  display: flex;
  gap: 15px;
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
  cursor: pointer;
  text-align: left;
`;
const LinkIcon = styled.div`
  width: 40px;
  position: relative;
  top: 2px;
  cursor: pointer;
`;
const Notification = styled.div<{ open: boolean }>`
  position: absolute;
  right: -280px;
  border-radius: 5px;
  box-sizing: border-box;
  z-index: 20;
  background-color: #fff;
  transition: opacity 0.15s, height 0.15s, padding 0.15s;
  opacity: ${props => (props.open ? '1' : '0')};
  width: 320px;
  height: ${props => (props.open ? '300px' : '0')};
  padding: ${props => (props.open ? '15px' : '0')};
  box-shadow: 2px 2px 2px black;
`;
