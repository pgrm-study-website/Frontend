import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import {
  changeField,
  checkPassword as userCheckPassword,
  changePassword as userChangePassword,
} from 'modules/users';
import styled from 'styled-components';

import Button from 'components/common/Button';

type stateType = {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
  passwordWarning: {
    content: string;
    color: string;
  };
  passwordConfirmWarning: {
    content: string;
    color: string;
  };
};
const initialState: stateType = {
  currentPassword: '',
  password: '',
  passwordConfirm: '',
  passwordWarning: {
    content: '* 8 ~ 16자 영문 + 숫자 + 기호',
    color: '#686868',
  },
  passwordConfirmWarning: {
    content: '',
    color: '#686868',
  },
};
const reducer = (state: stateType, action: any) => {
  const actionName: string = action.name;
  let newValue: string = action.target.value;
  const newWarning = {
    content: '',
    color: '',
  };

  switch (actionName) {
    case 'currentPassword': {
      newValue = newValue.substring(0, 16);
      return {
        ...state,
        [actionName]: newValue,
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
    default:
      return state;
  }
};

const PwdChange = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, checkPassword, changePassword } = useSelector(
    ({ users }: RootState) => ({
      user: users.user,
      checkPassword: users.checkPassword,
      changePassword: users.changePassword,
    }),
  );

  const [state, stateDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (changePassword) {
      alert('비밀번호가 변경되었습니다.');
      navigate(`/mypage/${user.nickname}`);
    }
  }, [navigate, dispatch, user, changePassword]);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Pwd Change';
    return () => {
      htmlTitle!.innerHTML = 'Plming';
      dispatch(changeField({ key: 'checkPassword', value: null }));
      dispatch(changeField({ key: 'changePassword', value: null }));
    };
  }, [dispatch]);

  const submit = () => {
    if (state.currentPassword === '') {
      alert('현재 비밀번호를 입력해 주세요.');
      return;
    }
    dispatch(
      userCheckPassword({
        id: user!.id,
        data: { password: state.currentPassword },
      }),
    );
  };
  const change = () => {
    if (
      state.passwordWarning.color !== '#009112' ||
      state.passwordConfirmWarning.color !== '#009112'
    ) {
      alert('비밀번호를 확인해 주세요.');
      return;
    }
    dispatch(
      userChangePassword({
        id: user!.id,
        data: { password: state.password },
      }),
    );
  };

  return (
    <Wrapper>
      <TitleText>비밀번호 변경</TitleText>

      {checkPassword ? (
        <>
          <InputItem>
            <Label htmlFor="inputNewPassword">새로운 비밀번호</Label>
            <InputText
              value={state.password}
              onChange={e => stateDispatch({ ...e, name: 'password' })}
              type="password"
              id="inputNewPassword"
              placeholder="Input Password"
            />
            <Warning color={state.passwordWarning.color}>
              {state.passwordWarning.content}
            </Warning>
          </InputItem>
          <InputItem>
            <Label htmlFor="inputNewPasswordConfirm">비밀번호 확인</Label>
            <InputText
              value={state.passwordConfirm}
              onChange={e => stateDispatch({ ...e, name: 'passwordConfirm' })}
              type="password"
              id="inputNewPasswordConfirm"
              placeholder="Input Password"
            />
            <Warning color={state.passwordConfirmWarning.color}>
              {state.passwordConfirmWarning.content}
            </Warning>
          </InputItem>
        </>
      ) : (
        <InputItem>
          <Label htmlFor="inputCurrentPassword">현재 비밀번호</Label>
          <InputText
            value={state.currentPassword}
            onChange={e => stateDispatch({ ...e, name: 'currentPassword' })}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
            type="password"
            id="inputCurrentPassword"
            placeholder="Input Password"
          />
        </InputItem>
      )}

      <div
        onClick={checkPassword ? change : submit}
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Button value="PwdChange" className="btn btn--grey">
          비밀번호 변경
        </Button>
      </div>
      <MypageText to={`/mypage/${user!.nickname}`}>
        마이페이지로 돌아가기
      </MypageText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn--grey {
    margin-top: 30px;
    width: 100%;
    max-width: 360px;
  }
  padding: 20px;
`;
const TitleText = styled.div`
  font-size: 25px;
  font-family: SuncheonR;
  margin-bottom: 50px;
`;
const Label = styled.label`
  font-size: 17px;
`;
const InputItem = styled.div`
  width: 100%;
  max-width: 360px;
  height: 100px;
  margin: 5px 0;
`;
const InputText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #e3e3e3;
  margin: 5px 0;
  font-size: 20px;
  &::placeholder {
    font-size: 16px;
  }
`;
const MypageText = styled(Link)`
  width: 100%;
  text-align: center;
  font-size: 17px;
  font-family: NanumSquareR;
  margin: 20px 0 10px 0;
`;
const Warning = styled.div<{ color: string }>`
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -1px;
  margin-top: 2px;
  color: ${props => props.color};
`;

export default PwdChange;
