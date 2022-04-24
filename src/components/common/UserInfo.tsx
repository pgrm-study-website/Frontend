import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';
import { BiMessageAltDetail } from 'react-icons/bi';
import styled from 'styled-components';
import { read } from 'lib/api/users';
import MessageModal from './MessageModal';
import { sendMessageProps } from 'lib/api/message';
import { RootState } from 'modules';
import { useDispatch, useSelector } from 'react-redux';
import { messageSend } from 'modules/message';

const UserInfo = ({ userId }: { userId: number }) => {
  const WrapperRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const [info, setInfo] = useState<any>(null);
  const [popUp, setPopUp] = useState(false);
  const [sendMessageContent, setSendMessageContent] = useState<string>('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { user } = useSelector(({ users }: RootState) => ({
    user: users.user,
  }));
  useEffect(() => {
    const loadData = async () => {
      let infoResponse;
      try {
        infoResponse = await read({ data: userId, type: 'id' });
      } catch (e) {
        infoResponse = { data: { id: -1, nickname: 'error', image: null } };
      }
      setInfo(infoResponse.data);
    };
    void loadData();
  }, []);
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
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const handleMessageSend = () => {
    if (user && info) {
      const obj: sendMessageProps = {
        userId: user.id.toString(),
        otherId: info.id.toString(),
        content: sendMessageContent,
      };
      dispatch(messageSend(obj));
      setSendMessageContent('');
      closeModal();
      alert(`${info.nickname as string}님에게 메시지를 보냈습니다. `);
    }
  };

  return (
    <Wrapper ref={WrapperRef}>
      <Wrapper2 onClick={() => setPopUp(!popUp)}>
        <UserImage
          src={
            info
              ? info.image || require('assets/images/defaultProfile.png')
              : require('assets/images/defaultProfile.png')
          }
        />
        <Nickname>{info ? info.nickname || '' : ''}</Nickname>
      </Wrapper2>
      {popUp && (
        <PopupWrapper>
          <Link to={`/mypage/${info ? (info.nickname as string) : ''}`}>
            <AiOutlineHome />
          </Link>
          <div onClick={openModal}>
            <BiMessageAltDetail />
          </div>
        </PopupWrapper>
      )}
      {info && modalOpen && (
        <MessageModal
          open={modalOpen}
          close={closeModal}
          nickname={info.nickname}
          handleMessageSend={handleMessageSend}
          sendMessageContent={sendMessageContent}
          setSendMessageContent={setSendMessageContent}
        ></MessageModal>
      )}
    </Wrapper>
  );
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
  background-color: white;
  border-radius: 5px;
`;
const Nickname = styled.div`
  font-size: 18px;
  font-family: NanumSquareR;
  margin-top: 1px;
`;
const PopupWrapper = styled.div`
  cursor: default;
  width: 90px;
  height: 50px;
  background-color: #f1f1f1;
  box-shadow: 2px 2px 2px black;
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
    border-bottom: 20px solid #f1f1f1;
    content: '';
    position: absolute;
    top: -10px;
    left: 0px;
  }
`;
