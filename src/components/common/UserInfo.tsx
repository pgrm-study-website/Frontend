import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMessageAltDetail } from 'react-icons/bi';
import styled from 'styled-components';

const testUserData = {
  nickname: 'seuha516',
  image:
    'https://w.namu.la/s/a50a10b0fc00aaa6d9c384e5bdcdc8b791978a45d5864752cb3131e9d6a40dda44b9102f2223390959c5c5ae20523b8512f04d824dbf2e3e3e395f3fcf26010be6b74a1920b61278bb5631862db12c3ab49042b801f4c06d6d2ed31b76003374',
};

const UserInfo = ({ userId }: { userId: number }) => {
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent): void {
      if (
        WrapperRef.current &&
        !WrapperRef.current.contains(e.target as Node)
      ) {
        setPopUp(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [WrapperRef]);

  if (userId === -1) {
    return (
      <Wrapper>
        <QuestionImage>?</QuestionImage>
        <Nickname style={{ color: '#363636' }}>??????</Nickname>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper ref={WrapperRef}>
        <Wrapper2 onClick={() => setPopUp(!popUp)}>
          <UserImage src={testUserData.image} />
          <Nickname>{testUserData.nickname}</Nickname>
        </Wrapper2>
        {popUp && (
          <PopupWrapper>
            <Link to={`/mypage/${userId}`}>
              <AiOutlineHome />
            </Link>
            <Link to="/comments">
              <BiMessageAltDetail />
            </Link>
          </PopupWrapper>
        )}
      </Wrapper>
    );
  }
};

export default UserInfo;

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const Wrapper2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;
const Nickname = styled.div`
  font-size: 18px;
  font-family: NanumSquareR;
  margin-top: 1px;
`;
const QuestionImage = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  font-size: 20px;
  background-color: #464646;
  color: white;
  text-align: center;
  line-height: 30px;
  font-weight: 700;
  margin-right: 10px;
`;
const PopupWrapper = styled.div`
  cursor: default;
  width: 90px;
  height: 50px;
  background-color: #ffffff;
  border-radius: 10px;
  z-index: 10;
  position: absolute;
  top: 45px;
  left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 30px;
    height: 30px;
    margin: 3px 4px;
    color: #434343;
    transition: color 0.15s linear;
    cursor: pointer;
    &:hover {
      color: black;
    }
  }
  &:after {
    border-top: 0px solid transparent;
    border-left: 0px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ffffff;
    content: '';
    position: absolute;
    top: -10px;
    left: 0px;
  }
`;
