import React from 'react';
import styled from 'styled-components';
import dateToString from 'lib/utils/dateToString';
import UserInfo from 'components/common/UserInfo';

const Info = ({
  userId,
  viewCnt,
  createDate,
  updateDate,
}: {
  userId: number;
  createDate: Date;
  updateDate: Date | null;
  viewCnt: number;
}) => {
  return (
    <Wrapper>
      <UserInfo userId={userId} />
      <DateWrapper>
        <CreateDateText>{`작성일: ${dateToString(createDate)}`}</CreateDateText>
        {updateDate && (
          <UpdateDateText>{`(${dateToString(
            updateDate,
          )}에 수정됨)`}</UpdateDateText>
        )}
      </DateWrapper>
      <ViewCountText>{`${viewCnt} Views`}</ViewCountText>
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  text-align: center;
`;
const DateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3px;
`;
const CreateDateText = styled.div`
  width: 130px;
  font-size: 14px;
  color: #464646;
`;
const UpdateDateText = styled.div`
  width: 130px;
  font-size: 12px;
  color: #464646;
  margin-top: 3px;
`;
const ViewCountText = styled.div`
  width: 90px;
  text-align: start;
  font-size: 14px;
  margin-top: 2px;
`;
