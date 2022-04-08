import React from 'react';
import styled from 'styled-components';

import {MdOutlineCancel} from 'react-icons/md';

type Props = {};
type notificationDataProps = {
  id: number;
  date: Date;
  content: string;
  sender: {
    name: string;
    type: 'announcement' | undefined;
    image?: string;
  };
};
const dummyData = [
  {
    id: 1,
    date: new Date(),
    content: '알림입니다!',
    sender: {
      name: '플밍',
    },
  },
  {
    id: 2,
    date: new Date(),
    content: '알림입니다! 2',
    sender: {
      name: '플밍',
    },
  },
  {
    id: 3,
    date: new Date(),
    content: '알림입니다! 3',
    sender: {
      name: '플밍',
    },
  },
];
const Notification = (props: Props) => {
  return (
    <Wrapper>
      <Title>Notification </Title>
      <Container>
        {dummyData.map(i => (
          <NotificationItem>
            <Content>{i.content}</Content>
            <SubContent>
              <Name>{i.sender.name}</Name> | <div>{i.date.toLocaleDateString()}</div>
            </SubContent>
            <DeleteBtn>
              <MdOutlineCancel />
            </DeleteBtn>
          </NotificationItem>
        ))}
      </Container>
    </Wrapper>
  );
};
const DeleteBtn = styled.div`
  position: absolute;
  color: #454545;
  font-size: 18px;
  top: 15px;
  right: 20px;
`;
const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 20px;
  color: #454545;
`;
const NotificationItem = styled.div`
  padding: 20px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  /* margin: 10px 0; */
  position: relative;
`;
const SubContent = styled.div`
  display: flex;
  margin-top: 15px;
  font-size: 14px;
  gap: 10px;
`;
const Name = styled.div``;
const Content = styled.div`
  font-size: 18px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  font-family: SuncheonR;
  min-height: 400px;
  height: calc(100vh - 100px);
  padding: 20px;
  align-items: center;
  font-family: SuncheonR;
  background-color: #f9f9f9;
`;
export default Notification;
