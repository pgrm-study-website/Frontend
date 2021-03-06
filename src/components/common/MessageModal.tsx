import React, { useState } from 'react';
import styled from 'styled-components';

type Props = {
  open: boolean;
  nickname: string;
  sendMessageContent: string;
  close: () => void;
  handleMessageSend: () => void;
  setSendMessageContent: (string: string) => void;
};

const MessageModal = ({
  open,
  close,
  nickname,
  handleMessageSend,
  sendMessageContent,
  setSendMessageContent,
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.keyCode === 13 && !e.shiftKey && handleMessageSend();
  };
  return (
    <Wrapper className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {`${nickname}님에게 메시지 보내기`}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <SendArea
              value={sendMessageContent}
              onChange={e => setSendMessageContent(e.target.value)}
              onKeyDown={e => handleKeyDown(e)}
            ></SendArea>
          </main>
          <ModalFooter>
            <button onClick={handleMessageSend}>send</button>
            <button onClick={close}>close</button>
          </ModalFooter>
        </section>
      ) : null}
    </Wrapper>
  );
};
export default MessageModal;
const ModalFooter = styled.footer`
  padding: 12px 16px;
  text-align: right;

  button {
    padding: 6px 12px;
    margin-left: 10px;
    color: #fff;
    background-color: #6c757d;
    border-radius: 5px;
    font-size: 13px;
  }
`;

const SendArea = styled.textarea`
  width: 100%;
  border: 1px solid #a4a4a4;
  border-radius: 5px;
  min-height: 80px;
  resize: none;
`;
const Wrapper = styled.div`
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  button {
    outline: none;
    cursor: pointer;
    border: 0;
  }
  & > section {
    width: 90%;
    max-width: 450px;
    margin: 0 auto;
    border-radius: 0.3rem;
    background-color: #fff;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-show 0.3s;
    overflow: hidden;
  }
  & > section > header {
    position: relative;
    padding: 16px 64px 16px 16px;
    background-color: #f1f1f1;
    font-weight: 700;
  }
  & > section > header button {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 30px;
    font-size: 21px;
    font-weight: 700;
    text-align: center;
    color: #999;
    background-color: transparent;
  }
  & > section > main {
    padding: 16px;
    border-bottom: 1px solid #dee2e6;
    border-top: 1px solid #dee2e6;
  }
  /* & > section > footer {
  
  } */
  &.openModal {
    display: flex;
    align-items: center;
    /* 팝업이 열릴때 스르륵 열리는 효과 */
    animation: modal-bg-show 0.3s;
  }
  @keyframes modal-show {
    from {
      opacity: 0;
      margin-top: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
  @keyframes modal-bg-show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;
