import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type messageProps = {
  id: number;
  content: string;
  date: string | Date;
};

export default function NotificationModal({
  data,
}: {
  data: Array<messageProps>;
}) {
  return (
    <NotificationList>
      <Title>알림</Title>
      {data.map(item => (
        <NotificationItem key={item.id} item={item}></NotificationItem>
      ))}
      <li>
        <Link to="/notification">
          <More>more</More>
        </Link>
      </li>
    </NotificationList>
  );
}
const NotificationItem = ({ item }: { item: messageProps }) => {
  return (
    <Item>
      <Content>{item.content}</Content>
      <Date>{item.date}</Date>
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
  color: #505050;
  font-size: 12px;
`;
