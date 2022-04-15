import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MdOutlineCancel } from 'react-icons/md';
import { RootState } from 'modules';
import { notificationProps } from 'lib/api/notice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { test } from '../../modules/notices';
// type Props = {};

const dummyData: Array<notificationProps> = [
  {
    id: 1,
    date: new Date(),
    content: '알림입니다!',
    noticeId: 1,
  },
  {
    id: 2,
    date: new Date(),
    content: '알림입니다! 2',
    noticeId: 2,
  },
  {
    id: 3,
    date: new Date(),
    content: '알림입니다! 3',
    noticeId: 3,
  },
];

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(dummyData);
  const handleDelete = (id: number) => {
    setData(data.filter(item => item.id !== id));
    //삭제 데이터 서버에 전송
  };
  const { notice } = useSelector((state: RootState) => ({
    notice: state.notices,
  }));
  const Intest = () => dispatch(test());
  useEffect(() => {
    Intest();
    console.log(notice);
  }, []);

  return (
    <Wrapper>
      <Title>Notification </Title>
      <Container>
        {data.map(i => (
          <NotificationItem key={i.content}>
            <Content>{i.content}</Content>
            <SubContent>
              <Name>{i.noticeId}</Name> |{' '}
              <div>{i.date.toLocaleDateString()}</div>
            </SubContent>
            <DeleteBtn onClick={() => handleDelete(i.id)}>
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
// function useSelector(
//   arg0: ({ listPosts, users }: RootState) => {
//     posts: any;
//     error: any;
//     user: any;
//   },
// ): {
//   posts: any;
//   error: any;
//   user: any;
// } {
//   throw new Error('Function not implemented.');
// }
