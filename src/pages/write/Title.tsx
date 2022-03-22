import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeField } from 'modules/post/writePosts';

const Title = ({ title }: { title: string }) => {
  const dispatch = useDispatch();
  return (
    <Wrapper>
      <NameText>제목</NameText>
      <TitleInput
        placeholder="ex) 자바 스터디 같이 해요~!"
        value={title}
        onChange={e =>
          dispatch(changeField({ key: 'title', value: e.target.value }))
        }
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 5px;
`;
const TitleInput = styled.input`
  font-size: 20px;
  width: 100%;
  height: 40px;
  border: 0;
  border-bottom: 2px solid gray;
  background-color: #ffffff00;
  padding: 0 5px;
  font-weight: 700;
  font-family: NanumSquareR;
`;

export default Title;
