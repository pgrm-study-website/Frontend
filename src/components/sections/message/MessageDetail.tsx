import React from 'react';
import styled from 'styled-components';
import { messagesProps, messagesDetailProps } from 'lib/api/message';
import { FiSend } from 'react-icons/fi';

type Props = {
  select: messagesProps;
  detail: Array<messagesDetailProps>;
  sendMessageContent: string;
  handleMessage: () => void;
  setSendMessageContent: (arg0: string) => void;
};
const MessageDetail = ({
  select,
  detail,
  sendMessageContent,
  handleMessage,
  setSendMessageContent,
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.keyCode === 13 && !e.shiftKey && handleMessage();
  };
  return (
    <ContentContainer>
      <MessageList>
        {detail.map((i, idx) => (
          <MessageItem key={`${idx}${i.content}`} className="border-bottom">
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
          onKeyPress={e => {
            if (e.key === 'Enter') handleMessage();
          }}
          style={{ resize: 'none' }}
        ></textarea>
        <button onClick={handleMessage}>
          <FiSend />
        </button>
      </SendMessageContainer>
    </ContentContainer>
  );
};
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
  @media all and (max-width: 900px) {
    min-height: 50px;
  }
  textarea {
    height: 100%;
    border: 1px solid #cecece;
    padding: 20px;
    border-radius: 10px;
    width: calc(100% - 40px);
    @media all and (max-width: 900px) {
      padding: 10px;
    }
  }
  button {
    height: 100%;
    border-radius: 10px;
    background-color: #4cbbc2;
    border: 1px solid #4cbbc2;
    width: 30px;
    color: #fff;
    cursor: pointer;
  }
`;

const SendUser = styled.div<{ sendOther: string }>`
  color: ${props => (props.sendOther === 'send' ? ' #ffc963' : '#4cbbc2')};
  font-weight: 700;
  padding: 10px 0;
`;
const MessageList = styled.ul`
  overflow-y: auto;
  margin: 20px 0;
  height: calc(100% - 60px);
  @media all and (max-width: 900px) {
    margin: 10px 0;
  }
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
export default MessageDetail;
