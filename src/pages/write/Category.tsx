import React from 'react';
import styled from 'styled-components';

const projectClassList = ['스터디', '프로젝트', '공모전', '기타'];

const Category = () => {
  return (
    <Wrapper>
      <NameText>카테고리</NameText>
      <ChoiceWrapper>
        {projectClassList.map(item => (
          <Choice key={item}>
            <Checkbox type="checkbox" name={item} />
            {item}
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
