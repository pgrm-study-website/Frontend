import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { RootState } from 'modules';
import {
  changeField,
  checkAuthEmail,
  sendAuthEmail,
  signup,
} from 'modules/users';
import styled from 'styled-components';

import SignTemplate from 'components/users/SignTemplate';
import Trapezoid from 'components/users/TrapezoidBox';
import Button from 'components/common/Button';
import { LoadingBox } from 'components/common/Loading';

type stateType = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  emailWarning: {
    content: string;
    color: string;
  };
  nicknameWarning: {
    content: string;
    color: string;
  };
  passwordWarning: {
    content: string;
    color: string;
  };
  passwordConfirmWarning: {
    content: string;
    color: string;
  };
  checkClause: boolean;
  authEmailCode: string;
};
const initialState: stateType = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  emailWarning: {
    content: '',
    color: '#686868',
  },
  nicknameWarning: {
    content: '* 2자 이상 8자 이하',
    color: '#686868',
  },
  passwordWarning: {
    content: '* 8 ~ 16자 영문 + 숫자 + 기호',
    color: '#686868',
  },
  passwordConfirmWarning: {
    content: '',
    color: '#686868',
  },
  checkClause: false,
  authEmailCode: '',
};
const reducer = (state: stateType, action: any) => {
  const actionName: string = action.name;
  let newValue: string = action.target.value;
  const newWarning = {
    content: '',
    color: '',
  };

  switch (actionName) {
    case 'email': {
      newValue = newValue.substring(0, 45);
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if (newValue.length === 0) {
        newWarning.content = '';
        newWarning.color = '#686868';
      } else if (emailRegex.test(newValue)) {
        newWarning.content = '* 올바른 이메일 형식입니다.';
        newWarning.color = '#009112';
      } else {
        newWarning.content = '* 올바른 이메일 형식이 아닙니다.';
        newWarning.color = '#ff3939';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'nickname': {
      newWarning.content = '* 2자 이상 8자 이하';
      newValue = newValue.substring(0, 8);
      if (newValue.length >= 2 && newValue.length <= 8) {
        newWarning.color = '#009112';
      } else if (newValue.length === 0) {
        newWarning.color = '#686868';
      } else {
        newWarning.color = '#ff3939';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'password': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      if (passwordPattern.test(newValue)) {
        newWarning.content = '* 한글을 입력할 수 없습니다..';
        newValue = newValue.replace(passwordPattern, '');
      } else {
        newWarning.content = '* 8 ~ 16자 영문 + 숫자 + 기호';
      }
      newValue = newValue.substring(0, 16);
      if (newValue.length >= 8 && newValue.length <= 16) {
        newWarning.color = '#009112';
      } else if (newValue.length === 0) {
        newWarning.color = '#686868';
      } else {
        newWarning.color = '#ff3939';
      }
      if (
        newValue === state.passwordConfirm &&
        state.passwordConfirm.length > 0
      ) {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
          passwordConfirmWarning: {
            content: '* 비밀번호가 일치합니다.',
            color: '#009112',
          },
        };
      } else if (state.passwordConfirm.length > 0) {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
          passwordConfirmWarning: {
            content: '* 비밀번호가 일치하지 않습니다.',
            color: '#ff3939',
          },
        };
      } else {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
        };
      }
    }
    case 'passwordConfirm': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      newValue = newValue.replace(passwordPattern, '');
      newValue = newValue.substring(0, 16);
      if (newValue.length === 0) {
        newWarning.content = '';
        newWarning.color = '#686868';
      } else if (newValue === state.password) {
        newWarning.content = '* 비밀번호가 일치합니다.';
        newWarning.color = '#009112';
      } else {
        newWarning.content = '* 비밀번호가 일치하지 않습니다.';
        newWarning.color = '#ff3939';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'checkClause': {
      return { ...state, checkClause: !state.checkClause };
    }
    case 'authEmailCode': {
      return { ...state, authEmailCode: action.target.value };
    }
    default:
      return state;
  }
};

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, authEmail, loading } = useSelector(
    ({ users, loading }: RootState) => ({
      user: users.user,
      authEmail: users.authEmail,
      loading: loading['users/SIGNUP'],
    }),
  );
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const [fold, setFold] = useState(false);
  const [popUp, setPopup] = useState(false);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Signup';
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    } else if (authEmail) {
      setPopup(false);
      dispatch(
        signup({
          social: 0,
          email: state.email,
          nickname: state.nickname,
          password: state.password,
        }),
      );
      dispatch(changeField({ key: 'authEmail', value: null }));
    }

    return () => {
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [navigate, dispatch, user, authEmail]);

  const submit = () => {
    if (state.emailWarning.color !== '#009112') {
      alert('이메일을 확인해 주세요.');
      return;
    } else if (state.nicknameWarning.color !== '#009112') {
      alert('닉네임을 확인해 주세요.');
      return;
    } else if (
      state.passwordWarning.color !== '#009112' ||
      state.passwordConfirmWarning.color !== '#009112'
    ) {
      alert('비밀번호를 확인해 주세요.');
      return;
    } else if (!state.checkClause) {
      alert('약관에 동의해 주세요.');
      return;
    }
    stateDispatch({ name: 'authEmailCode', target: { value: '' } });
    setPopup(true);
    dispatch(sendAuthEmail({ email: state.email }));
  };
  const sendAgain = () => {
    dispatch(sendAuthEmail({ email: state.email }));
    stateDispatch({ name: 'authEmailCode', target: { value: '' } });
    alert(`${state.email}로 인증 코드를 다시 보냈습니다.`);
  };
  const checkAuthEmailCode = () => {
    if (state.authEmailCode.length !== 6) {
      alert('6자리 코드를 입력해주세요.');
      return;
    }
    dispatch(checkAuthEmail({ email: state.email, code: state.authEmailCode }));
  };

  return (
    <SignTemplate>
      <Trapezoid text={'SIGN UP'} />
      {loading ? (
        <SignupContainer>
          <LoadingBox r="100px" />
        </SignupContainer>
      ) : (
        <SignupContainer>
          <FormGrid>
            <ColumnBox>
              <InputItem>
                <input type="text" style={{ width: 0, height: 0, border: 0 }} />
                <input
                  type="password"
                  style={{ width: 0, height: 0, border: 0 }}
                />
                <Label htmlFor="inputEmail">Email</Label>
                <InputText
                  value={state.email}
                  onChange={e => stateDispatch({ ...e, name: 'email' })}
                  type="text"
                  id="inputEmail"
                  placeholder="Input Email"
                />
                <Warning color={state.emailWarning.color}>
                  {state.emailWarning.content}
                </Warning>
              </InputItem>
              <InputItem>
                <Label htmlFor="inputNickname">Nickname</Label>
                <InputText
                  value={state.nickname}
                  onChange={e => stateDispatch({ ...e, name: 'nickname' })}
                  type="text"
                  id="inputNickname"
                  placeholder="Input Nickname"
                />
                <Warning color={state.nicknameWarning.color}>
                  {state.nicknameWarning.content}
                </Warning>
              </InputItem>
            </ColumnBox>
            <ColumnBox>
              <InputItem>
                <Label htmlFor="inputPwd">Password</Label>
                <InputText
                  value={state.password}
                  onChange={e => stateDispatch({ ...e, name: 'password' })}
                  type="password"
                  id="inputPwd"
                  placeholder="Input Password"
                />
                <Warning color={state.passwordWarning.color}>
                  {state.passwordWarning.content}
                </Warning>
              </InputItem>
              <InputItem>
                <Label htmlFor="inputPwdConfirm">Password Confirm</Label>
                <InputText
                  value={state.passwordConfirm}
                  onChange={e =>
                    stateDispatch({ ...e, name: 'passwordConfirm' })
                  }
                  type="password"
                  id="inputPwdConfirm"
                  placeholder="Password Confirm"
                />
                <Warning color={state.passwordConfirmWarning.color}>
                  {state.passwordConfirmWarning.content}
                </Warning>
              </InputItem>
            </ColumnBox>
          </FormGrid>
          <ClauseContainer>
            <ClauseCheck
              checked={state.checkClause}
              onChange={e => stateDispatch({ ...e, name: 'checkClause' })}
              type="checkbox"
              id="clauseCheck"
            />
            <label htmlFor="clauseCheck">약관 동의</label>
            <ClauseFoldText onClick={() => setFold(!fold)}>
              {fold ? '(약관 접기)' : '(약관 보기)'}
            </ClauseFoldText>
          </ClauseContainer>
          {fold && (
            <ClauseContentWrapper>
              {
                'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.'
              }
            </ClauseContentWrapper>
          )}
          <div
            onClick={submit}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button value="Login" className="btn btn--grey">
              회원가입
            </Button>
          </div>
          <SocialContainerText to="/login">
            소셜 로그인하러 가기
          </SocialContainerText>
        </SignupContainer>
      )}
      {popUp && (
        <AuthEmailBackground>
          <AuthEmailWrapper>
            <CloseIconWrapper>
              <AiOutlineClose onClick={() => setPopup(false)} />
            </CloseIconWrapper>
            <AuthEmailMessage>
              {`${state.email}로 인증 코드를 보냈습니다.`}
            </AuthEmailMessage>
            <AuthEmailInput
              value={state.authEmailCode}
              onChange={e => stateDispatch({ ...e, name: 'authEmailCode' })}
            />
            <AuthEmailButtonWrapper>
              <AuthEmailSendAgain onClick={sendAgain}>
                재전송
              </AuthEmailSendAgain>
              <AuthEmailSignup onClick={checkAuthEmailCode}>
                확인
              </AuthEmailSignup>
            </AuthEmailButtonWrapper>
          </AuthEmailWrapper>
        </AuthEmailBackground>
      )}
    </SignTemplate>
  );
}

const SignupContainer = styled.div`
  width: 100%;
  max-width: 800px;
  height: 100%;
  min-height: calc(100vh - 300px);
  @media screen and (max-width: 1024px) {
    min-height: calc(100vh - 250px);
  }
  @media screen and (max-width: 768px) {
    min-height: calc(100vh - 200px);
  }
  padding: 40px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn--grey {
    margin-top: 20px;
    width: 100%;
    max-width: 360px;
  }
`;
const FormGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media all and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    gap: 20px;
  }
`;
const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Label = styled.label`
  font-size: 24px;
`;
const InputItem = styled.div`
  height: 100px;
`;
const InputText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #e3e3e3;
  margin: 5px 0;
`;
const Warning = styled.div<{ color: string }>`
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -1px;
  margin-top: 2px;
  color: ${props => props.color};
`;
const ClauseContainer = styled.div`
  margin: 20px 0;
  font-size: 17px;
  font-family: NanumSquareR;
  display: flex;
  align-items: center;
`;
const ClauseCheck = styled.input`
  cursor: pointer;
  margin: 0 5px 0 0;
`;
const ClauseFoldText = styled.div`
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.5px;
  color: #646464;
  margin-left: 7.5px;
  cursor: pointer;
`;
const ClauseContentWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: #46464622;
  word-break: break-all;
  line-height: 24px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 25px;
  animation: smoothAppear 0.2s ease-in-out 0s 1 normal forwards;
  @keyframes smoothAppear {
    from {
      height: 0px;
    }
    to {
      height: 200px;
    }
  }
`;
const AuthEmailBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000c1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const AuthEmailWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
const CloseIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;
const AuthEmailMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: NanumSquareR;
  line-height: 28px;
`;
const AuthEmailInput = styled.input`
  width: 200px;
  margin-top: 20px;
  border: 0;
  border-bottom: 2px solid black;
  text-align: center;
  font-size: 36px;
`;
const AuthEmailButtonWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  div {
    cursor: pointer;
  }
`;
const AuthEmailSendAgain = styled.div`
  font-size: 16px;
  letter-spacing: -0.5px;
  color: #464646;
  margin-right: 20px;
`;
const AuthEmailSignup = styled.div`
  font-size: 20px;
`;
const SocialContainerText = styled(Link)`
  width: 100%;
  text-align: center;
  font-size: 17px;
  font-family: NanumSquareR;
  margin: 20px 0 10px 0;
`;
export default SignUp;
