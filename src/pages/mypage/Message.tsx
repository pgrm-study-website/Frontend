import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import {
  messageDetail,
  messageDetailRead,
  messageRead,
  messageReadSuccess,
  messageSend,
} from 'modules/message';
import { RootState } from 'modules';
import { messagesProps } from 'lib/api/message';

type messageContentProps = {
  id: number;
  name: string;
  data: Array<{
    sendOther: boolean;
    content: string;
  }>;
};
function Message() {
  const dispatch = useDispatch();
  const [messageDatas, setMessageDatas] = useState<messagesProps[] | null>([]);
  const [select, setSelect] = useState<number>(-1);
  const [sendMessageContent, setSendMessageContent] = useState<string>('');
  const [messageContent, setMessageContent] = useState<messageContentProps>({
    id: 0,
    name: '',
    data: [],
  });
  const { user, messages, detail } = useSelector(
    ({ users, messages, messageDetail }: RootState) => ({
      user: users.user,
      messages: messages.messages,
      detail: messageDetail.messageDetail,
    }),
  );

  useEffect(() => {
    //이걸 쓰고 성공하면 밑의 것이 자동으로 실행 되는 것인가?  reduc saga?
    user && dispatch(messageRead({ id: user.id }));
    // if (messages) {
    //   setMessageDatas(messages);
    // }
    // console.log(messageDatas, user);
  }, []);
  // useEffect(() => {
  //   console.log(messageDatas);
  // }, [messageDatas]);
  const handleMessage = () => {
    setMessageContent({
      ...messageContent,
      data: [
        ...messageContent.data,
        { sendOther: false, content: sendMessageContent },
      ],
    });

    //TODO : DB에 있는 값도 변경 필요, 서버에 전송

    //초기화
    setSendMessageContent('');
  };
  const handleSelect = (id: number) => {
    // setSelect(idx);
    if (user) {
      const string = `userId=${user.id}&otherId=${id}`;
      dispatch(messageDetailRead(string));
      console.log(detail);
    }
    // setMessageContent(sendTestDataList.filter(item => item.id === id)[0]);
  };
  const handleDummy = () => {
    const obj = {
      userId: '20',
      otherId: '6',
      content: '테스트 쪽지',
    };
    dispatch(messageSend(obj));
    console.log(detail);
  };
  return (
    <Wrapper>
      <MessageListContainer>
        <Title>쪽지함</Title>
        <button onClick={() => handleDummy()}>test</button>
        <MessageList>
          {messages &&
            messages.map((item, idx) => (
              <MessageItem
                key={idx}
                onClick={() => handleSelect(item.otherPersonId)}
                className={idx === select ? 'select' : 'non-select'}
              >
                {item.otherPersionNickname}
              </MessageItem>
            ))}
        </MessageList>
      </MessageListContainer>
      <CurrentContent>
        {detail && (
          <>
            <MessageOtherName>{messageContent.name}</MessageOtherName>
            <ContentContainer>
              <MessageList>
                {/* 수정 필요 */}
                {detail.map((i, idx) => (
                  <MessageItem key={i.content} className="border-bottom">
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
