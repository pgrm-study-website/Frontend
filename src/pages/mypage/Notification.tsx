import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { MdOutlineCancel } from 'react-icons/md';
import { RootState } from 'modules';
import { notificationProps } from 'lib/api/notice';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  noticeDeleteOne,
  noticeDeleteOneSuccess,
  noticeRead,
  noticeReadSuccess,
  noticesState,
} from '../../modules/notices';
// type Props = {};

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState<Array<notificationProps>>();
  const { notice } = useSelector((state: RootState) => ({
    notice: state.notices.notice,
  }));
  useEffect(() => {
    // dispatch(noticeRead()); //이걸 쓰고 성공하면 밑의 것이 자동으로 실행 되는 것인가?  reduc saga?
    dispatch(noticeReadSuccess());
    if (notice) {
      setData(notice);
    }
  }, [data, notice]);

  const handleDelete = (id: number) => {
    data && setData(data.filter(item => item.id !== id));

    //삭제 데이터 서버에 전송
    const log = dispatch(noticeDeleteOne(id));
    console.log(log);
  };
  return (
    <Wrapper>
      <Title>Notification </Title>
      <Container>
        {data &&
          data.map(i => (
            <NotificationItem key={i.content}>
              <Content>{i.content}</Content>
              <SubContent>
                <Name>{i.user_id}</Name> |{' '}
                <div>{i.create_date && i.create_date.toLocaleDateString()}</div>
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
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'Bazzi';
  color: #454545;
`;
const NotificationItem = styled.div`
  padding: 20px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  position: relative;
`;
const SubContent = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 3px;
  font-size: 18px;
  gap: 10px;
`;
const Name = styled.div``;
const Content = styled.div`
  font-size: 22px;
  color: #454545;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Bazzi';
  gap: 10px;
`;

const Wrapper = styled.div`
  width: 100%;
  font-family: SuncheonR;
  font-family: 'Bazzi';
  min-height: 400px;
  height: calc(100vh - 100px);
  padding: 30px;
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
