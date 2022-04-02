import React from 'react';
import styled from 'styled-components';

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
  userName: '익명',
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
  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>
        <MessageList>
          <MessageItem className="select">ssssssssssss</MessageItem>
          {testData.map((item, idx) => (
            <MessageItem key={idx}>{item.otherName}</MessageItem>
          ))}
        </MessageList>
      </MessageListContainer>
      <CurrentContent>
        <MessageOtherName>{sendTestData.userName}</MessageOtherName>
        <MessageList>
          {sendTestData.data.map((i, idx) => (
            <MessageItem key={i.content}>
              <div>{i.sendOther ? '받은 쪽지' : '보낸 쪽지'}</div>
              <div> {i.content}</div>
            </MessageItem>
          ))}
        </MessageList>
      </CurrentContent>
    </Wrapper>
  );
}
const Title = styled.div`
  font-size: 20px;
  font-weight: 700;
`;
const MessageOtherName = styled.div`
  font-weight: 700;
  font-size: 20px;
`;
const MessageList = styled.ul`
  overflow-y: scroll;
  margin-top: 20px;
  height: fit-content;
`;
const MessageItem = styled.li`
  width: 100%;
  height: 60px;
  &.select {
    background-color: #4cbbc2;
    color: #fff;
  }
`;
const MessageListContainer = styled.div`
  border: 1px solid #cecece;
  border-radius: 15px;
  height: 100%;
  width: 300px;
  padding: 20px;
  overflow-y: hidden;
`;
const CurrentContent = styled.div`
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
