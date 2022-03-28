import React from 'react';
import {
  BsPersonFill,
  BsQuestionLg,
  BsFillCalendarWeekFill,
} from 'react-icons/bs';
import styled from 'styled-components';

const MoreInfo = ({
  participantMax,
  period,
}: {
  participantMax: number | null;
  period: number | null;
}) => {
  return (
    <Wrapper>
      <NameText>세부 정보</NameText>
      <ContentWrapper>
        <ContentItemWrapper>
          <SmallNameText>{`최대 인원 ${
            participantMax ? participantMax.toString() + '명' : '미정'
          }`}</SmallNameText>
          <PersonIconWrapper>
            {participantMax ? (
              Array.from({ length: participantMax }, () => null).map(
                (i, idx) => <BsPersonFill key={idx} />,
              )
            ) : (
              <BsQuestionLg />
            )}
          </PersonIconWrapper>
        </ContentItemWrapper>
        <ContentItemWrapper>
          <SmallNameText>{`예상 기간 ${
            period
              ? period === 24
                ? '6달 이상'
                : period % 4 == 0
                ? (period / 4).toString() + '달'
                : period.toString() + '주'
              : '미정'
          }`}</SmallNameText>{' '}
          <CalendarIconWrapper>
            {period ? (
              Array.from({ length: period }, () => null).map((i, idx) => (
                <BsFillCalendarWeekFill key={idx} />
              ))
            ) : (
              <BsQuestionLg style={{ width: '30px', height: '30px' }} />
            )}
          </CalendarIconWrapper>
        </ContentItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default MoreInfo;

const Wrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  padding: 30px 20px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #4cc2791c;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 10px;
`;
const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
const ContentItemWrapper = styled.div`
  margin: 24px 0;
  min-width: min(400px, 100%);
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SmallNameText = styled.div`
  font-size: 22px;
  font-family: SuncheonR;
  margin-bottom: 12px;
`;
const PersonIconWrapper = styled.div`
  margin-top: 10px;
  max-width: 180px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  svg {
    width: 30px;
    height: 30px;
    color: #464646;
  }
`;
const CalendarIconWrapper = styled.div`
  margin-top: 10px;
  max-width: 288px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  svg {
    width: 20px;
    height: 20px;
    color: #464646;
    margin: 2px;
  }
`;
