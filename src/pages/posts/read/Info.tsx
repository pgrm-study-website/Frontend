import React from 'react';
import styled from 'styled-components';
import dateToString from 'lib/utils/dateToString';
import UserInfo from 'components/common/UserInfo';

const Info = ({
  userId,
  viewCount,
  createDate,
  updateDate,
}: {
  userId: number;
  createDate: Date;
  updateDate: Date;
  viewCount: number;
}) => {
  return (
    <Wrapper>
      <UserInfo userId={userId} />
      <DateWrapper>
        <CreateDateText>{`작성일: ${dateToString(createDate)}`}</CreateDateText>
        {createDate !== updateDate && (
          <UpdateDateText>{`(${dateToString(
            updateDate,
          )}에 수정됨)`}</UpdateDateText>
        )}
      </DateWrapper>
      <ViewCountText>{`${viewCount} Views`}</ViewCountText>
    </Wrapper>
  );
};

export default Info;

const Wrapper = styled.div`
  margin-top: 3px;
  height: 30px;
  display: flex;
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
`;
