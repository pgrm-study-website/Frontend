import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoIosNotifications, IoIosNotificationsOutline } from 'react-icons/io';
import { RootState } from 'modules';
import { logout } from 'modules/users';
import styled from 'styled-components';
import { AiOutlineMessage } from 'react-icons/ai';
import NotificationModal from './notification/NotificationModal';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const NotificationWrapperRef = useRef<HTMLDivElement>(null);
  const MyInfoWrapperRef = useRef<HTMLDivElement>(null);
  const { notice, user } = useSelector((state: RootState) => ({
    notice: state.notices.notice,
    user: state.users.user,
  }));
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [myInfoOpen, setMyInfoOpen] = useState(false);

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
  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        MyInfoWrapperRef.current &&
        !MyInfoWrapperRef.current.contains(e.target as Node)
      ) {
        setMyInfoOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [MyInfoWrapperRef]);

  return user ? (
    <>
      <Wrapper>
        <Title>
          <Link to="/">Plming</Link>
        </Title>
        <IconContainer>
          <NotificationWrapper ref={NotificationWrapperRef}>
            {notice && notice.length > 0 ? (
              <IoIosNotifications
                className="navigationItem"
                onClick={() => setNotificationOpen(!notificationOpen)}
              />
            ) : (
              <IoIosNotificationsOutline
                className="navigationItem"
                onClick={() => setNotificationOpen(!notificationOpen)}
              />
            )}
            <Notification open={notificationOpen}>
              {notificationOpen && notice && (
                <NotificationModal data={notice} close={setNotificationOpen} />
              )}
            </Notification>
          </NotificationWrapper>
          <MessageWrapper>
            <AiOutlineMessage
              className="navigationItem"
              onClick={() => {
                navigate(`/message`);
              }}
            />
          </MessageWrapper>
          <MyInfoWrapper ref={MyInfoWrapperRef} className="navigationItem">
            <img
              src={user.image || require('assets/images/defaultProfile.png')}
              alt="profile"
              onClick={() => setMyInfoOpen(!myInfoOpen)}
            />
            <MyInfoModal open={myInfoOpen}>
              {myInfoOpen && (
                <>
                  <Link to={`/mypage/${user.nickname}`}>mypage</Link>
                  <div
                    onClick={() => {
                      if (window.confirm('로그아웃 하시겠습니까?')) {
                        dispatch(logout());
                        navigate('/');
                      }
                    }}
                  >
                    logout
                  </div>
                </>
              )}
            </MyInfoModal>
          </MyInfoWrapper>
        </IconContainer>
      </Wrapper>
      <FakeHeader />
    </>
  ) : (
    <>
      <Wrapper>
        <Title>
          <Link to="/">Plming</Link>
        </Title>
        <ButtonWrapper>
          <Link to="/login">login</Link>
          <Link to="/signup">signup</Link>
        </ButtonWrapper>
      </Wrapper>
      <FakeHeader />
    </>
  );
};

export default Header;
const MessageWrapper = styled.div``;
const Wrapper = styled.div`
  background-color: #4cbbc2;
  width: 100%;
  height: 75px;
  display: none;
  font-family: NanumSquareR;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  .navigationItem {
    cursor: pointer;
  }
  @media all and (max-width: 900px) {
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
  }
  z-index: 100;
`;
const FakeHeader = styled.div`
  width: 100%;
  height: 75px;
  min-height: 75px;
  display: none;
  @media all and (max-width: 900px) {
    display: block;
  }
`;
const Title = styled.div`
  font-family: 'Bazzi';
  font-size: 50px;
  color: #fff;
`;
const IconContainer = styled.div`
  color: #fff;
  font-size: 30px;
  display: flex;
  gap: 20px;
  height: 30px;
`;
const NotificationWrapper = styled.div`
  position: relative;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
const Notification = styled.div<{ open: boolean }>`
  position: absolute;
  background-color: #fff;
  width: 300px;
  border-radius: 5px;
  right: -100px;
  height: fit-content;
  color: #242424;
  font-size: 15px;
  transition: opacity 0.15s, height 0.15s, padding 0.15s;
  opacity: ${props => (props.open ? '1' : '0')};
  width: 300px;
  height: ${props => (props.open ? 'fit-content' : '0')};
  padding: ${props => (props.open ? '15px' : '0')};
  box-shadow: 2px 2px 2px black;
`;
const MyInfoWrapper = styled.div`
  position: relative;
  img {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: white;
    cursor: pointer;
  }
`;
const MyInfoModal = styled.div<{ open: boolean }>`
  position: absolute;
  background-color: #fff;
  width: 100px;
  border-radius: 5px;
  right: 0;
  height: fit-content;
  color: #242424;
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  transition: opacity 0.15s, height 0.15s;
  opacity: ${props => (props.open ? '1' : '0')};
  width: 120px;
  height: ${props => (props.open ? '80px' : '0')};
  box-shadow: 2px 2px 2px black;
  div {
    cursor: pointer;
  }
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  color: white;
  font-size: 20px;
`;
