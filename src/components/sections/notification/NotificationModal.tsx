import React, { useState } from 'react';
import styled from 'styled-components';

type messageProps = {
  id: number;
  content: string;
  date: string | Date;
};
const messageDummyData = [
  {
    id: 10,
    content: '000에 댓글이 달렸습니다',
    date: '2022.03.30',
  },
  {
    id: 11,
    date: '2022.03.30',
    content: '000 스터디에 가입이 되었습니다',
  },
  {
    id: 12,
    date: '2022.03.30',
    content: '000님에게 쪽지가 왔습니다 "안녕하세요..."',
  },
];
interface Props {
  open: boolean;
  setOpen: () => void;
  data: Array<messageProps>;
}
export default function NotificationMoal({
  data,
}: {
  data: Array<messageProps>;
}) {
  return (
    <ul>
      {messageDummyData.map(item => (
        <NotificationItem key={item.id} item={item}></NotificationItem>
      ))}
      <li>more</li>
    </ul>
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
const Item = styled.li`
  padding: 15px 0;
  text-align: left;
  border-bottom: 0.5px solid #ababab;
  &:last-child {
    border: none;
  }
`;
const Content = styled.div`
  font-weight: 500;
`;
const Date = styled.div`
  margin-top: 10px;
  color: #505050;
  font-size: 12px;
`;
