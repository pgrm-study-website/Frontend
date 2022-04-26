import React, { useEffect } from 'react';
import styled from 'styled-components';

import { BsX } from 'react-icons/bs';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { RootState } from 'modules';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  noticeDelete,
  noticeDeleteOne,
  noticeRead,
} from '../../modules/notices';

const Notification = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { notice, user } = useSelector((state: RootState) => ({
    notice: state.notices.notice,
    user: state.users.user,
  }));
  useEffect(() => {
    if (!user) {
      navigate(`/`);
    }
    dispatch(noticeRead());
  }, []);
  const handleDelete = (id: number) => {
    const deleteFlag = window.confirm('알림를 삭제하시겠습니까?');
    if (deleteFlag) {
      dispatch(noticeDeleteOne(id));
      alert(`알림이 삭제되었습니다`);
    }
    dispatch(noticeRead());
  };
  const handleDeleteAll = () => {
    const deleteFlag = window.confirm('전체 알림를 삭제하시겠습니까?');
    deleteFlag && dispatch(noticeDelete());
  };

  return (
    <Wrapper>
      <Title>
        Notification
        <button onClick={() => handleDeleteAll()}>알림 전체 삭제</button>
      </Title>
      <Container>
        {notice &&
          notice.data.map((item: any) => (
            <NotificationItem key={item.id}>
              <NavigateBtn onClick={() => navigate(item.url)}>
                <AiOutlineArrowRight />
              </NavigateBtn>
              <DeleteBtn onClick={() => handleDelete(item.id)}>
                <BsX />
              </DeleteBtn>
              <Content>{item.content}</Content>
              <SubContent>
                <div>{item.createDate.split('T')[0]}</div>
              </SubContent>
            </NotificationItem>
          ))}{' '}
      </Container>
    </Wrapper>
  );
};

const DeleteBtn = styled.div`
  position: absolute;
  color: #454545;
  font-size: 25px;
  top: 20px;
  right: 20px;
  cursor: pointer;
  @media all and (max-width: 900px) {
    top: auto;
    bottom: 10px;
  }
`;
const NavigateBtn = styled.div`
  position: absolute;
  color: #454545;
  font-size: 19px;
  top: 23px;
  cursor: pointer;
  right: 48px;
  @media all and (max-width: 900px) {
    top: auto;
    bottom: 13px;
  }
`;
const Title = styled.h2`
  font-size: 30px;
  margin-bottom: 20px;
  font-weight: 700;
  font-family: 'Bazzi';
  color: #454545;
  position: relative;
  button {
    position: absolute;
    right: 0;
    background-color: #fff;
    border-radius: 5px;
    padding: 5px;
    font-family: 'Bazzi';
    font-size: 17px;
    border: 1px solid #454545;
    color: #454545;
  }
`;
const NotificationItem = styled.div`
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  position: relative;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;
const SubContent = styled.div`
  display: flex;
  margin-top: 15px;
  margin-left: 3px;
  font-size: 18px;
  gap: 10px;
  color: #454545;
`;
const Content = styled.div`
  font-size: 22px;
  color: #454545;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'Bazzi';
  gap: 10px;
  overflow-y: auto;
  height: calc(100% - 40px);
`;

const Wrapper = styled.div`
  width: 100%;
  min-width: 350px;
  font-family: SuncheonR;
  font-family: 'Bazzi';
  min-height: 400px;
  height: calc(100vh - 100px);
  padding: 30px;
  align-items: center;
  font-family: SuncheonR;
  background-color: #f9f9f9;
  @media all and (max-width: 900px) {
    height: auto;
  }
`;
export default Notification;
