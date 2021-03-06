import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeField } from 'modules/posts/writePosts';

const categoryList = ['스터디', '프로젝트', '공모전', '기타'];

const Category = ({ category }: { category: string }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <NameText>카테고리</NameText>
      <ChoiceWrapper>
        {categoryList.map(i => (
          <Choice
            key={i}
            onClick={() => dispatch(changeField({ key: 'category', value: i }))}
          >
            <Checkbox
              type="checkbox"
              checked={category === i}
              onChange={() =>
                dispatch(changeField({ key: 'category', value: i }))
              }
            />
            {i}
          </Choice>
        ))}
      </ChoiceWrapper>
    </Wrapper>
  );
};

export default Category;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 12px;
`;
const ChoiceWrapper = styled.div`
  width: 100%;
  display: flex;
`;
const Choice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: NanumSquareR;
  font-size: 18px;
  & + & {
    margin-left: 15px;
  }
  cursor: pointer;
  @media all and (max-width: 400px) {
    font-size: 15px;
    & + & {
      margin-left: 8px;
    }
    input {
      width: 15px;
      height: 15px;
    }
  }
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
