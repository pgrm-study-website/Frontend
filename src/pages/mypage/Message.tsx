import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { messageDetailRead, messageRead, messageSend } from 'modules/message';
import { RootState } from 'modules';
import { messagesProps, sendMessageProps } from 'lib/api/message';
import { useNavigate } from 'react-router-dom';

function Message() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [select, setSelect] = useState<messagesProps>();
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
      // if (messages) {
      //   const sendPath = `userId=${user.id}&otherId=${messages[0].otherPersonId}`;
      //   dispatch(messageDetailRead(sendPath));
      //   setSelect(messages[0]);
      // }
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

  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>
        <MessageList>
          {messages &&
            messages.map((item, idx) => (
              <MessageItem key={idx} onClick={() => handleSelect(item)}>
                <MessageItemName> {item.otherPersonNickname}</MessageItemName>
                <div> {item.content}</div>
              </MessageItem>
            ))}
        </MessageList>
      </MessageListContainer>
      <CurrentContent>
        {detail && (
          <>
            <MessageOtherName>{}</MessageOtherName>
            <ContentContainer>
              <MessageList>
                {detail.map((i, idx) => (
                  <MessageItem
                    key={`${idx}${i.content}`}
                    className="border-bottom"
                  >
                    <SendUser sendOther={i.type}>
                      {i.type == 'receive' ? '받은 쪽지' : '보낸 쪽지'}
                    </SendUser>
                    <div> {i.content}</div>
                  </MessageItem>
                ))}
              </MessageList>
              <SendMessageContainer>
                <textarea
                  name="sendMessage"
                  id="sendMessage"
                  value={sendMessageContent}
                  onChange={e => setSendMessageContent(e.target.value)}
                ></textarea>
                <button onClick={handleMessage}>
                  <FiSend />
                </button>
              </SendMessageContainer>
            </ContentContainer>
          </>
        )}
      </CurrentContent>
    </Wrapper>
  );
}
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 20px);
`;
const SendMessageContainer = styled.div`
  min-height: 100px;
  display: flex;
  justify-content: space-between;
  textarea {
    height: 100%;
    border: 1px solid #cecece;
    padding: 20px;
    border-radius: 10px;
    width: calc(100% - 50px);
  }
  button {
    height: 100%;
    border-radius: 10px;
    background-color: #4cbbc2;
    border: 1px solid #4cbbc2;
    width: 40px;
    color: #fff;
    cursor: pointer;
  }
`;
const MessageOtherName = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
const SendUser = styled.div<{ sendOther: string }>`
  color: ${props => (props.sendOther === 'send' ? ' #ffc963' : '#4cbbc2')};
  font-weight: 700;
  padding: 10px 0;
`;
const MessageList = styled.ul`
  overflow-y: scroll;
  margin-top: 20px;
  height: fit-content;
`;
const MessageItem = styled.li`
  width: 100%;
  height: 60px;
  padding: 10px;
  box-sizing: border-box;
  &.select {
    background-color: #4cbbc2;
    color: #fff;
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
`;
const CurrentContent = styled.div<{ current?: any }>`
  background-color: #fff;
  width: calc(100% - 320px);
  margin-left: 20px;
  border: 1px solid #cecece;
  height: 100%;
  padding: 20px;
  border-radius: 15px;
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
`;
export default Message;
