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
import { useNavigate, useParams } from 'react-router-dom';
import MessageDetail from 'components/sections/message/MessageDetail';
import MessageDetailM from 'components/sections/message/MessageDetailM';
import { AiOutlineDelete } from 'react-icons/ai';

function Message() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState<messagesProps | null>();
  const [sendMessageContent, setSendMessageContent] = useState<string>('');
  const param = useParams()['*'];

  const { user, messages, detail, reload } = useSelector(
    ({ users, messages, messageDetail }: RootState) => ({
      user: users.user,
      messages: messages.messages,
      detail: messageDetail.messageDetail,
      reload: messageDetail.reload,
    }),
  );

  useEffect(() => {
    if (user) {
      dispatch(messageRead({ id: user.id }));
    } else {
      navigate(`/`);
    }
  }, [param]);
  useEffect(() => {
    if (user) {
      if (param === '' || param === undefined) {
        setSelect(null);
      } else if (messages) {
        const item = messages.filter(
          i => i.otherPersonId == parseInt(param),
        )[0];
        setSelect(item);
        const sendParam = `userId=${user.id}&otherId=${item.otherPersonId}`;
        dispatch(messageDetailRead(sendParam));
      }
    }
  }, [messages]);
  useEffect(() => {
    if (user) {
      dispatch(messageRead({ id: user.id }));
    }
    setSendMessageContent('');
  }, [reload]);

  const handleMessage = () => {
    if (sendMessageContent === '' || sendMessageContent === '\n') return;
    if (user && select) {
      const objtest: sendMessageProps = {
        userId: user.id.toString(),
        otherId: select.otherPersonId.toString(),
        content: sendMessageContent,
      };
      dispatch(messageSend(objtest));
    }
  };
  const handleSelect = (item: messagesProps) => {
    navigate(`/message/${item.otherPersonId}`);
  };
  const handleMessageDelete = (id: number) => {
    const deleteFlag = window.confirm('전체 메시지를 삭제하시겠습니까?');
    if (deleteFlag && user) {
      const param = `userId=${user.id}&otherId=${id}`;
      dispatch(messageDeleteAll(param));
      navigate('/message');
    }
  };

  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>

        {messages && messages.length !== 0 ? (
          <MessageList>
            {messages.map((item, idx) => {
              return (
                <MessageItem
                  key={idx}
                  onClick={() => handleSelect(item)}
                  className={` ${
                    select?.otherPersonId === item.otherPersonId && 'select'
                  }`}
                >
                  <MessageItemName>{item.otherPersonNickname}</MessageItemName>
                  <div> {item.content}</div>
                </MessageItem>
              );
            })}
          </MessageList>
        ) : (
          <NonMessage>메시지가 없습니다.</NonMessage>
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
            </MessageOtherName>
            <MessageDetail
              select={select}
              detail={detail}
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
          closeModal={() => setSelect(null)}
          handleMessageDelete={handleMessageDelete}
        >
          <MessageDetail
            select={select}
            detail={detail}
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
  cursor: pointer;
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
