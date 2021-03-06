import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { messagesProps, messagesDetailProps } from 'lib/api/message';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsXLg } from 'react-icons/bs';

type Props = {
  select: messagesProps;
  handleMessageDelete: (arg0: number) => void;
  closeModal: () => void;
  children: ReactNode;
};
const MessageDetailM = ({
  select,
  closeModal,
  children,
  handleMessageDelete,
}: Props) => {
  return (
    <WrapperBG>
      <WrapperM>
        <CloseBtn onClick={() => closeModal()} />
        <MessageOtherName>
          <div> {select.otherPersonNickname}</div>
          <MessageDeleteBtn
            onClick={() => handleMessageDelete(select.otherPersonId)}
          ></MessageDeleteBtn>
        </MessageOtherName>
        {children}
      </WrapperM>
    </WrapperBG>
  );
};
const MessageDeleteBtn = styled(AiOutlineDelete)`
  cursor: pointer;
  font-size: 20px;
  position: relative;
  bottom: 3px;
`;
const MessageOtherName = styled.div`
  font-weight: 700;
  font-size: 15px;
  position: relative;
  display: flex;
  gap: 5px;
`;
const CloseBtn = styled(BsXLg)`
  float: right;
  cursor: pointer;
`;
const WrapperBG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  display: none;

  @media all and (max-width: 900px) {
    display: block;
  }
`;
const WrapperM = styled.div`
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
  padding: 20px;
  font-size: 13px;
`;
export default MessageDetailM;
