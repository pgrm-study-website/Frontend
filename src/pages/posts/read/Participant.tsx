import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsChatLeftDots,
  BsCheckLg,
  BsExclamationTriangle,
} from 'react-icons/bs';
import { RootState } from 'modules';
import {
  list as applicationList,
  write as applicationWrite,
  read as applicationRead,
  update as applicationUpdate,
} from 'modules/posts/application';
import styled, { css } from 'styled-components';

import { LoadingBox } from 'components/common/Loading';
import UserInfo from 'components/common/UserInfo';
import SimpleUserInfo from 'components/common/SimpleUserInfo';

const SmallIcon: {
  [key: string]: any;
} = {
  대기: <BsChatLeftDots />,
  승인: <BsCheckLg />,
  거절: <BsExclamationTriangle />,
};

const Participant = ({
  postId,
  postUserId,
}: {
  postId: number;
  postUserId: number;
}) => {
  const dispatch = useDispatch();

  const { list, read, reload, user } = useSelector(
    ({ application, users }: RootState) => ({
      list: application.list,
      read: application.read,
      reload: application.reload,
      user: users.user,
    }),
  );
  const [target, setTarget] = useState<any>(null);

  useEffect(() => {
    if (user) {
      dispatch(applicationList(postId));
      dispatch(applicationRead(postId));
    }
  }, [reload]);

  const CountApply = (x: any) => {
    let result = 0;
    for (let i = 0; i < x.length; i++) {
      if (x[i].status === '승인') result++;
    }
    return result;
  };
  const onWrite = () => {
    dispatch(applicationWrite(postId));
  };
  const onUpdate = (status: string, nickname: string) => {
    dispatch(applicationUpdate({ postId, status, nickname }));
    setTarget(null);
  };

  if (!user) {
    return <></>;
  } else if (!list) {
    return (
      <Wrapper>
        <LoadingBox r="100px" />
      </Wrapper>
    );
  } else {
    if (user.id === postUserId) {
      return (
        <Wrapper>
          <NameText>참가자 관리</NameText>
          <ContentWrapper>
            <UserWrapper>
              <UserInfoText>{`${list.length}명이 이 팀에 참가를 신청했어요!`}</UserInfoText>
              <UserInfoWrapper>
                {list.map((i: any, idx: number) => (
                  <SimpleUserWrapper
                    key={idx}
                    onClick={() => setTarget(target === i ? null : i)}
                    target={target === i ? 'true' : 'false'}
                  >
                    <SimpleUserInfo userId={i.user.id} />
                    {SmallIcon[i.status]}
                  </SimpleUserWrapper>
                ))}
                {list.length === 0 && (
                  <UserInfoText style={{ color: '#464646' }}>
                    신청자가 아직 없습니다.
                  </UserInfoText>
                )}
              </UserInfoWrapper>
            </UserWrapper>
            <SubmitWrapper>
              {!target ? (
                <>
                  <UserInfoText>{`${CountApply(
                    list,
                  )}명의 신청을 승인했습니다.`}</UserInfoText>
                  <UserInfoText>
                    좌측의 신청자를 클릭하고 신청 여부를 결정하세요.
                  </UserInfoText>
                </>
              ) : target.user.id === user.id ? (
                <SubmitWrapper>
                  <ResultLargeText>Accepted!</ResultLargeText>
                  <ResultIcon>
                    <BsCheckLg style={{ color: 'green' }} />
                  </ResultIcon>
                  <ResultSmallText>작성자 본인입니다.</ResultSmallText>
                </SubmitWrapper>
              ) : target.status === '대기' ? (
                <>
                  <MessageInput placeholder="ex) 승인/거절하겠습니다!" />
                  <ButtonWrapper>
                    <SubmitButton
                      onClick={() => onUpdate('승인', target.user.nickname)}
                    >
                      승인
                    </SubmitButton>
                    <SubmitButton
                      onClick={() => onUpdate('거절', target.user.nickname)}
                    >
                      거절
                    </SubmitButton>
                  </ButtonWrapper>
                </>
              ) : target.status === '거절' ? (
                <>
                  <MessageInput placeholder="ex) 다시 승인하겠습니다." />
                  <ButtonWrapper>
                    <SubmitButton
                      onClick={() => onUpdate('승인', target.user.nickname)}
                    >
                      승인
                    </SubmitButton>
                  </ButtonWrapper>
                </>
              ) : (
                <>
                  <MessageInput placeholder="ex) 다시 거절하겠습니다." />
                  <ButtonWrapper>
                    <SubmitButton
                      onClick={() => onUpdate('거절', target.user.nickname)}
                    >
                      거절
                    </SubmitButton>
                  </ButtonWrapper>
                </>
              )}
            </SubmitWrapper>
          </ContentWrapper>
        </Wrapper>
      );
    } else {
      return (
        <Wrapper>
          <NameText>참가 신청하기</NameText>
          <ContentWrapper>
            <UserWrapper>
              <UserInfoText>{`${list.length}명이 이 팀에 참가중입니다.`}</UserInfoText>
              <UserInfoWrapper>
                {list.map((i: any, idx: number) => (
                  <UserInfo key={idx} userId={i.id} />
                ))}
                {list.length === 0 && (
                  <UserInfoText style={{ color: '#464646' }}>
                    참가자가 아직 없습니다.
                  </UserInfoText>
                )}
              </UserInfoWrapper>
            </UserWrapper>
            <SubmitWrapper>
              {read === '미신청' ? (
                <>
                  <MessageInput placeholder="ex) 이 팀에 참가하고 싶어요!" />
                  <ButtonWrapper>
                    <SubmitButton onClick={onWrite}>신청하기</SubmitButton>
                  </ButtonWrapper>
                </>
              ) : read === '대기' ? (
                <SubmitWrapper>
                  <ResultLargeText>Waiting...</ResultLargeText>
                  <ResultIcon>
                    <BsChatLeftDots style={{ color: '#646464' }} />
                  </ResultIcon>
                  <ResultSmallText>참가 신청 후 대기중입니다.</ResultSmallText>
                </SubmitWrapper>
              ) : read === '거절' ? (
                <SubmitWrapper>
                  <ResultLargeText>Declined</ResultLargeText>
                  <ResultIcon>
                    <BsExclamationTriangle style={{ color: '#d54c3e' }} />
                  </ResultIcon>
                  <ResultSmallText>참가 신청이 거절되었습니다.</ResultSmallText>
                </SubmitWrapper>
              ) : (
                <SubmitWrapper>
                  <ResultLargeText>Accepted!</ResultLargeText>
                  <ResultIcon>
                    <BsCheckLg style={{ color: 'green' }} />
                  </ResultIcon>
                  <ResultSmallText>참가 신청이 승인되었습니다!</ResultSmallText>
                </SubmitWrapper>
              )}
            </SubmitWrapper>
          </ContentWrapper>
        </Wrapper>
      );
    }
  }
};

export default Participant;

const Wrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  padding: 30px 20px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #4cbbc21c;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 10px;
`;
const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const UserWrapper = styled.div`
  height: 100%;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 20px;
`;
const UserInfoText = styled.div`
  font-family: NanumSquareR;
  font-size: 18px;
  margin: 20px 0 12px 0;
  text-align: center;
  line-height: 24px;
`;
const UserInfoWrapper = styled.div`
  width: 100%;
  height: 210px;
  padding: 15px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  & > div + div {
    margin-top: 10px;
  }
  background-color: #00000008;
  border-radius: 10px;
`;
const SimpleUserWrapper = styled.div<{ target: string }>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.15s linear;
  &:hover {
    background-color: #ffffffa3;
  }
  ${props =>
    props.target === 'true' &&
    css`
      background-color: #ffffffa3;
    `};
  svg {
    width: 20px;
    height: 20px;
    margin-left: 10px;
  }
`;
const SubmitWrapper = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px 20px 40px 20px;
  @media all and (max-width: 460px) {
    min-width: 100%;
  }
`;
const MessageInput = styled.textarea`
  width: 100%;
  height: 180px;
  font-size: 18px;
  padding: 10px;
  font-family: NanumSquareR;
  line-height: 24px;
  border: none;
  resize: none;
  background-color: #ffffff6e;
  border-radius: 10px;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const SubmitButton = styled.div`
  width: 100px;
  margin-top: 20px;
  text-align: center;
  font-size: 24px;
  font-family: SuncheonR;
  font-weight: 700;
  color: #646464;
  cursor: pointer;
  transition: color 0.15s linear;
  &:hover {
    color: black;
  }
`;
const ResultLargeText = styled.div`
  font-size: 24px;
  font-family: NanumSquareR;
`;
const ResultSmallText = styled.div`
  font-size: 18px;
  font-family: NanumSquareR;
  word-break: keep-all;
  text-align: center;
  line-height: 24px;
`;
const ResultIcon = styled.div`
  margin: 20px 0;
  svg {
    width: 50px;
    height: 50px;
  }
`;
