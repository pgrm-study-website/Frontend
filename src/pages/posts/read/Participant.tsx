import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BsChatLeftDots,
  BsCheckLg,
  BsExclamationTriangle,
} from 'react-icons/bs';
import { RootState } from 'modules';
import { read as readPost } from 'modules/posts/readPosts';
import {
  list as applicationList,
  write as applicationWrite,
  read as applicationRead,
  update as applicationUpdate,
  remove as applicationRemove,
} from 'modules/posts/application';
import styled, { css } from 'styled-components';

import { LoadingBox } from 'components/common/Loading';
import UserInfo from 'components/common/UserInfo';
import SimpleUserInfo from 'components/common/SimpleUserInfo';
import { messageSend } from 'modules/message';

const SmallIcon: {
  [key: string]: any;
} = {
  대기: <BsChatLeftDots style={{ color: '#464646' }} />,
  승인: <BsCheckLg style={{ color: 'green' }} />,
  거절: <BsExclamationTriangle style={{ color: 'd54c3e' }} />,
};

const Participant = ({
  postId,
  postUserId,
  status,
  last,
}: {
  postId: number;
  postUserId: number;
  status: boolean;
  last: boolean;
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
  const [messageValue, setMessageValue] = useState('');

  useEffect(() => {
    if (user) {
      dispatch(applicationList(postId));
      dispatch(applicationRead(postId));
    }
  }, []);
  useEffect(() => {
    if (user && reload) {
      dispatch(applicationList(postId));
      dispatch(applicationRead(postId));
      dispatch(readPost(postId));
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
    if (messageValue !== '') {
      const objtest = {
        userId: user!.id.toString(),
        otherId: postUserId.toString(),
        content: messageValue,
      };
      dispatch(messageSend(objtest));
    }
  };
  const onUpdate = (status: string, nickname: string) => {
    if (last && status === '승인') {
      if (
        !window.confirm(
          '이 신청을 승인하면 게시글이 마감되며, 더이상 수정할 수 없습니다.\n승인하시겠습니까?',
        )
      ) {
        return;
      }
    }
    dispatch(applicationUpdate({ postId, status, nickname }));
    if (messageValue !== '') {
      const objtest = {
        userId: user!.id.toString(),
        otherId: target.user.id.toString(),
        content: messageValue,
      };
      dispatch(messageSend(objtest));
    }
    setTarget(null);
  };
  const onCancle = () => {
    if (window.confirm('정말 신청을 취소하시겠습니까?')) {
      dispatch(applicationRemove(postId));
    }
  };
  const onChangeMessage = (e: any) => {
    setMessageValue(e.target.value);
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
    if (!status) {
      return (
        <Wrapper>
          <ContentWrapper>
            <UserWrapper>
              <UserInfoText>{`${list.length}명이 이 팀에 참가했습니다.`}</UserInfoText>
              <UserInfoWrapper>
                {list.map((i: any, idx: number) => (
                  <UserInfo key={idx} userId={i.user ? i.user.id : i.id} />
                ))}
              </UserInfoWrapper>
            </UserWrapper>
            <SubmitWrapper>
              {user.id === postUserId ? (
                <UserInfoText>{`${list.length}명의 신청을 승인했습니다.`}</UserInfoText>
              ) : (
                <UserInfoText>{`${list.length}명의 신청이 승인됐습니다.`}</UserInfoText>
              )}
              <UserInfoText>마감된 게시글입니다.</UserInfoText>
            </SubmitWrapper>
          </ContentWrapper>
        </Wrapper>
      );
    } else if (user.id === postUserId) {
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
                    onClick={() => {
                      setTarget(target === i ? null : i);
                      setMessageValue('');
                    }}
                    target={target === i ? 'true' : 'false'}
                  >
                    <SimpleUserInfo userId={i.user ? i.user.id : i.id} />
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
                    신청자를 확인하고 승인 여부를 결정하세요.
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
                  <MessageInput
                    placeholder="ex) 승인/거절하겠습니다!"
                    onChange={onChangeMessage}
                    value={messageValue}
                  />
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
                  <MessageInput
                    placeholder="ex) 다시 승인하겠습니다."
                    onChange={onChangeMessage}
                    value={messageValue}
                  />
                  <ButtonWrapper>
                    <SubmitButton
                      onClick={() => onUpdate('승인', target.user.nickname)}
                    >
                      승인
                    </SubmitButton>
                  </ButtonWrapper>
                </>
              ) : (
                target.status === '승인' && (
                  <>
                    <MessageInput
                      placeholder="ex) 다시 거절하겠습니다."
                      onChange={onChangeMessage}
                      value={messageValue}
                    />
                    <ButtonWrapper>
                      <SubmitButton
                        onClick={() => onUpdate('거절', target.user.nickname)}
                      >
                        거절
                      </SubmitButton>
                    </ButtonWrapper>
                  </>
                )
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
                {list.map(
                  (i: any, idx: number) =>
                    i.id >= 0 && (
                      <UserInfo key={idx} userId={i.user ? i.user.id : i.id} />
                    ),
                )}
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
                  <MessageInput
                    placeholder="ex) 이 팀에 참가하고 싶어요!"
                    onChange={onChangeMessage}
                    value={messageValue}
                  />
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
                  <SubmitCancleButton onClick={onCancle}>
                    취소하기
                  </SubmitCancleButton>
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
                read === '승인' && (
                  <SubmitWrapper>
                    <ResultLargeText>Accepted!</ResultLargeText>
                    <ResultIcon>
                      <BsCheckLg style={{ color: 'green' }} />
                    </ResultIcon>
                    <ResultSmallText>
                      참가 신청이 승인되었습니다!
                    </ResultSmallText>
                    <SubmitCancleButton onClick={onCancle}>
                      취소하기
                    </SubmitCancleButton>
                  </SubmitWrapper>
                )
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
const SubmitCancleButton = styled.div`
  font-size: 20px;
  font-family: NanumSquareR;
  margin-top: 10px;
  cursor: pointer;
  transition: color 0.15s linear;
  &:hover {
    color: #ff6565;
  }
`;
