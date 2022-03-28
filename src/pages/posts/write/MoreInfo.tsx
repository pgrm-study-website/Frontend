import React from 'react';
import { useDispatch } from 'react-redux';
import {
  BsPersonFill,
  BsQuestionLg,
  BsFillCalendarWeekFill,
} from 'react-icons/bs';
import styled from 'styled-components';
import { changeField } from 'modules/posts/writePosts';

const MoreInfo = ({
  participantMax,
  period,
}: {
  participantMax: number | null;
  period: number | null;
}) => {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <NameText>세부 계획</NameText>
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
          <VolumeSlider
            type="range"
            min={2}
            max={12}
            value={participantMax || 2}
            onChange={e => {
              dispatch(
                changeField({
                  key: 'participantMax',
                  value: parseInt(e.target.value),
                }),
              );
            }}
          />
          {participantMax && (
            <NullButton
              onClick={() =>
                dispatch(
                  changeField({
                    key: 'participantMax',
                    value: null,
                  }),
                )
              }
            >
              인원 미정
            </NullButton>
          )}
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
          }`}</SmallNameText>
          <CalendarIconWrapper>
            {period ? (
              Array.from({ length: period }, () => null).map((i, idx) => (
                <BsFillCalendarWeekFill key={idx} />
              ))
            ) : (
              <BsQuestionLg style={{ width: '30px', height: '30px' }} />
            )}
          </CalendarIconWrapper>
          <VolumeSlider
            type="range"
            min={1}
            max={24}
            value={period || 1}
            onChange={e => {
              dispatch(
                changeField({
                  key: 'period',
                  value: parseInt(e.target.value),
                }),
              );
            }}
          />
          {period && (
            <NullButton
              onClick={() =>
                dispatch(
                  changeField({
                    key: 'period',
                    value: null,
                  }),
                )
              }
            >
              기간 미정
            </NullButton>
          )}
        </ContentItemWrapper>
      </ContentWrapper>
    </Wrapper>
  );
};

export default MoreInfo;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 40px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
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
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SmallNameText = styled.div`
  font-size: 20px;
  font-family: SuncheonR;
  margin-bottom: 12px;
`;
const VolumeSlider = styled.input`
  margin-top: 25px;
  -webkit-appearance: none;
  width: min(90%, 300px);
  height: 5px;
  background-color: #484848;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    pointer-events: all;
    background-color: #24777c;
    border-radius: 20px;
    width: 16px;
    height: 18px;
    cursor: pointer;
  }
  pointer-events: none;
  -webkit-appearance: none;
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
const NullButton = styled.div`
  margin-top: 20px;
  font-size: 16px;
  font-family: Cafe24SsurroundAir;
  background-color: #00000022;
  padding: 10px 15px 6px 15px;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.15s linear;
  &:hover {
    background-color: #00000044;
  }
`;
