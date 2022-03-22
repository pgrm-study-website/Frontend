import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { changeField } from 'modules/post/writePosts';

const categoryList: {
  [key: string]: string;
} = {
  study: '스터디',
  project: '프로젝트',
  competition: '공모전',
  etc: '기타',
};

const Category = ({ category }: { category: string }) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <NameText>카테고리</NameText>
      <ChoiceWrapper>
        {Object.keys(categoryList).map(item => (
          <Choice key={item}>
            <Checkbox
              type="checkbox"
              onChange={() =>
                dispatch(changeField({ key: 'category', value: item }))
              }
              checked={category === item}
            />
            {categoryList[item]}
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
  margin-top: 30px;
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
`;
const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
