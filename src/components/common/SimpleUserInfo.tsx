import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { read } from 'lib/api/users';

const SimpleUserInfo = ({ userId }: { userId: number }) => {
  const WrapperRef = useRef<HTMLDivElement>(null);
  const [info, setInfo] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const infoResponse = await read({ data: userId, type: 'id' });
      setInfo(infoResponse.data);
    };
    void loadData();
  }, []);

  return (
    <Wrapper ref={WrapperRef}>
      <Wrapper2>
        <UserImage
          src={
            info
              ? info.image || require('assets/images/defaultProfile.png')
              : require('assets/images/defaultProfile.png')
          }
        />
        <Nickname>{info ? info.nickname || '' : ''}</Nickname>
      </Wrapper2>
    </Wrapper>
  );
};

export default SimpleUserInfo;

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  align-items: center;
  position: relative;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const Wrapper2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
const UserImage = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 10px;
  background-color: white;
  border-radius: 5px;
`;
const Nickname = styled.div`
  font-size: 18px;
  font-family: NanumSquareR;
  margin-top: 1px;
`;
