import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';

import styled from 'styled-components';

import Button from 'components/common/Button';
import Trapezoid from 'components/users/TrapezoidBox';
import SignTemplate from 'components/users/SignTemplate';
const initialState: { [key: string]: any } = {
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
};
const reducer = (state: { [key: string]: any }, action: any) => {
  const actionName: string = action.name;
  let newValue: string = action.target.value;
  const newWarning = {
    content: '',
    color: '',
  };

  switch (actionName) {
    case 'email': {
      const emailPattern = /[^a-zA-Z0-9@.]/g;
      if (emailPattern.test(newValue)) {
        newValue = newValue.replace(emailPattern, '');
      }
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
      break;
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
      break;
    }
    case 'password': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      if (passwordPattern.test(newValue)) {
        newWarning.content = '* 한/영 키를 확인해주세요.';
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
      }
      break;
    }
    case 'passwordConfirm': {
      const passwordConfirmPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      newValue = newValue.replace(passwordConfirmPattern, '');
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
      break;
    }
    default:
      break;
  }
  return {
    ...state,
    [actionName]: newValue,
    [actionName + 'Warning']: newWarning,
  };
};

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const user = useSelector((state: RootState) => state.users.user);
  const loading = useSelector(
    (state: RootState) => state.loading['users/REGISTER'],
  );

  const onSubmit = () => {
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
    }
    alert(JSON.stringify(state));
  };

  useEffect(() => {
    if (user) {
      navigate('/');
      try {
        localStorage.setItem(
          'user',
          JSON.stringify({
            email: user.email,
            nickname: user.nickname,
            image: user.image,
          }),
        );
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [navigate, user]);

  return (
    <SignTemplate>
      <Trapezoid text={'SIGN UP'} />
      <SignupContainer>
        <FormGrid>
          <div>
            {/* 자동완성 무효화 */}
            <input type="text" style={{ width: 0, height: 0, border: 0 }} />
            <input type="password" style={{ width: 0, height: 0, border: 0 }} />
            <Label htmlFor="inputEmail" className="form__label">
              email
            </Label>
            <InputText
              value={state.email}
              onChange={e => stateDispatch({ ...e, name: 'email' })}
              type="text"
              id="inputEmail"
              className="form__input"
              name="email"
              placeholder="input email"
              required
            />
            <Warning color={state.emailWarning.color}>
              {state.emailWarning.content}
            </Warning>
          </div>
          <div>
            <Label htmlFor="inputNickname" className="form__label">
              nickname
            </Label>
            <InputText
              value={state.nickname}
              onChange={e => stateDispatch({ ...e, name: 'nickname' })}
              type="text"
              name="nickname"
              id="inputNickname"
              className="form__input"
              placeholder="input nickname"
              required
            />
            <Warning color={state.nicknameWarning.color}>
              {state.nicknameWarning.content}
            </Warning>
          </div>
          <div>
            <Label htmlFor="inputPwd" className="form__label">
              password
            </Label>
            <InputText
              value={state.password}
              onChange={e => stateDispatch({ ...e, name: 'password' })}
              type="password"
              id="inputPwd"
              name="password"
              className="form__input"
              placeholder="input password"
              required
            />
            <Warning color={state.passwordWarning.color}>
              {state.passwordWarning.content}
            </Warning>
          </div>
          <div>
            <Label htmlFor="inputPwdConfirm" className="form__label">
              password Confirm
            </Label>
            <InputText
              value={state.passwordConfirm}
              onChange={e => stateDispatch({ ...e, name: 'passwordConfirm' })}
              type="password"
              name="passwordConfirm"
              id="inputPwdConfirm"
              className="form__input"
              placeholder="input password"
              required
            />
            <Warning color={state.passwordConfirmWarning.color}>
              {state.passwordConfirmWarning.content}
            </Warning>
          </div>
        </FormGrid>
        <ClauseContainer>
          <ClauseCheck
            type="checkbox"
            name="clauseCheck"
            id="clauseCheck"
            required
          />
          <label htmlFor="clauseCheck">약관 동의</label>
        </ClauseContainer>
        <div
          onClick={onSubmit}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Button value="Login" className="btn btn--grey">
            회원가입
          </Button>
        </div>
      </SignupContainer>
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
  padding: 30px 20px 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .btn--grey {
    margin-top: 20px;
    width: 100%;
    max-width: 360px;
  }
`;
const FormGrid = styled.div`
  width: 100%;
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media all and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    gap: 20px;
  }
`;
const Label = styled.label`
  font-size: 24px;
  cursor: pointer;
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
const Warning = styled.div<{ color: string }>`
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -1px;
  margin-top: 2px;
  color: ${props => props.color};
`;

export default SignUp;
