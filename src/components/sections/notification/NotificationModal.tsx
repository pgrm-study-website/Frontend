import { notificationProps } from 'lib/api/notice';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function NotificationModal({
  data,
  close,
}: {
  data: Array<notificationProps>;
  close: (arg: boolean) => void;
}) {
  console.log(data);

  return (
    <NotificationList>
      {data.length === 0 ? <Title>알림이 없습니다</Title> : <Title>알림</Title>}
      {data.length <= 3
        ? data.map(item => (
            <NotificationItem key={item.id} item={item}></NotificationItem>
          ))
        : data
            .slice(0, 3)
            .map(item => (
              <NotificationItem key={item.id} item={item}></NotificationItem>
            ))}
      {data.length !== 0 && (
        <li>
          <Link to="/notification">
            <More onClick={() => close(false)}>more</More>
          </Link>
        </li>
      )}
    </NotificationList>
  );
}
const NotificationItem = ({ item }: { item: notificationProps }) => {
  console.log(item);

  return (
    <Item>
      <Content>{item.content}</Content>
      <Date>{item.createDate.split('T')[0]}</Date>
    </Item>
  );
};
const More = styled.div`
  font-weight: 700;
  padding-top: 10px;
  cursor: pointer;
`;
const Title = styled.li`
  font-weight: 700;
`;
const NotificationList = styled.ul`
  text-align: center;
`;
const Item = styled.li`
  padding: 15px 0;
  text-align: left;
  border-bottom: 0.5px solid #ababab;
  &:last-child {
    border: none;
  }
`;
const Content = styled.div`
  cursor: pointer;
  font-weight: 500;
  &:hover {
    text-decoration: underline;
  }
`;
const Date = styled.div`
  margin-top: 10px;
  margin-left: 5px;
  color: #505050;
  font-size: 15px;
`;
