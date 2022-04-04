import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';

// type Props = {};
const testData = [
  {
    id: 1,
    userId: 123,
    userName: 'sumi',
    otherId: 33333,
    otherName: 'hey',
    content: 'this is message',
  },
  {
    id: 2,
    userId: 123,
    userName: 'sumi',
    otherId: 33313,
    content: 'this is message',
    otherName: 'hey2312',
  },
  {
    id: 3,
    userId: 123,
    userName: 'sumi',
    otherId: 1232132,
    content: 'this is message',
    otherName: 'heyasdd',
  },
  {
    id: 4,
    userId: 123,
    userName: 'sumi',
    otherId: 335734633,
    content: 'this is message',
    otherName: 'heasdy',
  },
  {
    id: 5,
    userId: 123,
    userName: 'sumi',
    otherId: 333368543,
    content: 'this is message',
    otherName: 'heasddddddy',
  },
  {
    id: 6,
    userId: 123,
    userName: 'sumi',
    content: 'this is message',
    otherId: 3377733,
    otherName: 'hey name',
  },
];
const sendTestData = {
  userId: 33333,
  userName: 'hey',
  data: [
    {
      sendOther: true,
      content: 'Hello',
    },
    {
      sendOther: false, //false 이면 자신
      content: 'Hi ',
    },
    {
      sendOther: true,
      content: 'Hello2',
    },
    {
      sendOther: false, //-1이면 자신
      content: 'Hi 2',
    },
  ],
};

function Message() {
  const [select, setSelect] = useState<number>(-1);
  const handleMessageClick = (idx: number) => {
    setSelect(idx);
  };
  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>
        <MessageList>
          {testData.map((item, idx) => (
            <MessageItem
              key={idx}
              onClick={() => handleMessageClick(idx)}
              className={idx === select ? 'select' : 'non-select'}
            >
              {item.otherName}
            </MessageItem>
          ))}
        </MessageList>
      </MessageListContainer>
      <CurrentContent current={testData[select]}>
        <MessageOtherName>{sendTestData.userName}</MessageOtherName>
        <ContentContainer>
          <MessageList>
            {sendTestData.data.map((i, idx) => (
              <MessageItem key={i.content} className="border-bottom">
                <SendUser sendOther={i.sendOther}>
                  {i.sendOther ? '받은 쪽지' : '보낸 쪽지'}
                </SendUser>
                <div> {i.content}</div>
              </MessageItem>
            ))}
          </MessageList>
          <SendMessageContainer>
            <textarea name="sendMessage" id="sendMessage"></textarea>
            <button>
              <FiSend />
            </button>
          </SendMessageContainer>
        </ContentContainer>
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
const SendUser = styled.div<{ sendOther: boolean }>`
  color: ${props => (props.sendOther ? ' #ffc963' : '#4cbbc2')};
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