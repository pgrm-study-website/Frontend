import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  messageDeleteAll,
  messageDetailRead,
  messageRead,
  messageSend,
} from 'modules/message';
import { RootState } from 'modules';
import { messagesProps, sendMessageProps } from 'lib/api/message';
import { useNavigate } from 'react-router-dom';
import MessageDetail from 'components/sections/message/MessageDetail';
import MessageDetailM from 'components/sections/message/MessageDetailM';
import { BsXLg } from 'react-icons/bs';
import { AiOutlineDelete } from 'react-icons/ai';

function Message() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState<messagesProps | null>();
  const [sendMessageContent, setSendMessageContent] = useState<string>('');

  const { user, messages, detail } = useSelector(
    ({ users, messages, messageDetail }: RootState) => ({
      user: users.user,
      messages: messages.messages,
      detail: messageDetail.messageDetail,
    }),
  );

  useEffect(() => {
    if (user) {
      dispatch(messageRead({ id: user.id }));
    } else {
      navigate(`/`);
    }
  }, []);

  const handleMessage = () => {
    if (user && select) {
      const objtest: sendMessageProps = {
        userId: user.id.toString(),
        otherId: select.otherPersonId.toString(),
        content: sendMessageContent,
      };
      dispatch(messageSend(objtest));
      alert(`메시지를 전송하였습니다.  `);
      dispatch(messageRead({ id: user.id }));
    }
    //초기화
    setSendMessageContent('');
    // TODO :  조금의 시간 뒤에 리로드가 필요하다.
    select && handleSelect(select);
  };
  const handleSelect = (item: messagesProps) => {
    setSelect(item);

    if (user) {
      const sendParam = `userId=${user.id}&otherId=${item.otherPersonId}`;
      dispatch(messageDetailRead(sendParam));
    }
  };
  const handleMessageDelete = (id: number) => {
    if (user) {
      const param = `userId=${user.id}&otherId=${id}`;

      dispatch(messageDeleteAll(param));
      alert(`전체 메시지를 삭제하였습니다. `);
      navigate('/message');
      dispatch(messageRead({ id: user.id }));
    }
  };
  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>

        {messages && messages.length !== 0 ? (
          <MessageList>
            {messages.map((item, idx) => (
              <MessageItem
                key={idx}
                onClick={() => handleSelect(item)}
                className={`pointer ${
                  select?.otherPersonId === item.otherPersonId && 'select'
                }`}
              >
                <MessageItemName>{item.otherPersonNickname}</MessageItemName>
                <div> {item.content}</div>
              </MessageItem>
            ))}
          </MessageList>
        ) : (
          <NonMessage>메시지가 없습니다. </NonMessage>
        )}
      </MessageListContainer>
      <CurrentContent>
        {detail && select && (
          <>
            <MessageOtherName>
              <div> {select.otherPersonNickname}</div>
              <MessageDeleteBtn
                onClick={() => handleMessageDelete(select.otherPersonId)}
              ></MessageDeleteBtn>
            </MessageOtherName>{' '}
            <MessageDetail
              select={select}
              detail={detail}
              handleMessageDelete={handleMessageDelete}
              sendMessageContent={sendMessageContent}
              handleMessage={handleMessage}
              setSendMessageContent={setSendMessageContent}
            />
          </>
        )}
      </CurrentContent>
      {detail && select && (
        <MessageDetailM
          select={select}
          detail={detail}
          closeModal={() => setSelect(null)}
          handleMessageDelete={handleMessageDelete}
          sendMessageContent={sendMessageContent}
          handleMessage={handleMessage}
          setSendMessageContent={setSendMessageContent}
        >
          <MessageDetail
            select={select}
            detail={detail}
            handleMessageDelete={handleMessageDelete}
            sendMessageContent={sendMessageContent}
            handleMessage={handleMessage}
            setSendMessageContent={setSendMessageContent}
          />
        </MessageDetailM>
      )}
    </Wrapper>
  );
}

const MessageDeleteBtn = styled(AiOutlineDelete)`
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
`;
const NonMessage = styled.div`
  margin: 20px 0;
`;
const MessageOtherName = styled.div`
  font-weight: 700;
  font-size: 20px;
  position: relative;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

const MessageList = styled.ul`
  overflow-y: auto;
  margin: 20px 0;
  height: calc(100% - 60px);
`;
const MessageItem = styled.li`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  &.pointer {
    cursor: pointer;
  }
  &.select {
    background-color: #75cbd1;
    color: #fff;
    div {
      color: #fff;
    }
  }
  &.border-bottom {
    height: fit-content;
    border-bottom: 1px solid #cecece;
  }
  &.select,
  &.non-select {
    cursor: pointer;
  }
`;
const MessageItemName = styled.div`
  color: #4cbbc2;
  font-weight: 600;
  margin-bottom: 10px;
`;
const MessageListContainer = styled.div`
  border: 1px solid #cecece;
  border-radius: 15px;
  height: 100%;
  width: 300px;
  padding: 20px;
  background-color: #fff;
  overflow-y: hidden;
  @media all and (max-width: 900px) {
    width: 100%;
  }
`;
const CurrentContent = styled.div<{ current?: any }>`
  background-color: #fff;
  width: calc(100% - 320px);
  margin-left: 20px;
  border: 1px solid #cecece;
  height: 100%;
  padding: 20px;
  border-radius: 15px;
  @media all and (max-width: 900px) {
    display: none;
  }
`;
const CurrentContentMobile = styled.div`
  display: none;
  position: absolute;
  box-sizing: border-box;
  width: calc(100% - 80px);
  height: calc(100% - 300px);
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 15px;
  background-color: #fff;
  @media all and (max-width: 900px) {
    display: block;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  font-family: SuncheonR;
  min-height: 400px;
  height: calc(100vh - 100px);
  padding: 20px;
  display: flex;
  align-items: center;
  font-family: SuncheonR;
  background-color: #f9f9f9;
  position: relative;
  @media all and (max-width: 900px) {
    height: calc(100% - 160px);
  }
`;
export default Message;
