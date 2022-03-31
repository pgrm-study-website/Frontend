import React from 'react';
import styled from 'styled-components';

// type Props = {};

function Message() {
  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>
        <MessageList>
          <MessageItem className="select">ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
        </MessageList>
      </MessageListContainer>
      <CurrentContent>
        <MessageOtherName>sumi</MessageOtherName>
        <MessageList>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
          <MessageItem>ssssssssssss</MessageItem>
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
  height: 100%;
`;
const MessageItem = styled.li`
  width: 100%;
  /* border: 1px solid grey; */
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
  background-color: #f9f9f9;
`;
export default Message;
