import React, { useState, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { RootState } from 'modules';
import {
  changeField,
  sendAuthEmail,
  checkAuthEmail,
  read as userRead,
  changePassword,
} from 'modules/users';
import styled from 'styled-components';

import SignTemplate from 'components/users/SignTemplate';
import Trapezoid from 'components/users/TrapezoidBox';
import Button from 'components/common/Button';

type stateType = {
  email: string;
  emailWarning: {
    content: string;
    color: string;
  };
  authEmailCode: string;
};
const initialState: stateType = {
  email: '',
  emailWarning: {
    content: '',
    color: '#686868',
  },
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
    case 'authEmailCode': {
      return { ...state, authEmailCode: action.target.value };
    }
    default:
      return state;
  }
};

function PwdFind() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, authEmail, read, loading } = useSelector(
    ({ users, loading }: RootState) => ({
      user: users.user,
      authEmail: users.authEmail,
      read: users.read,
      loading: loading['users/CHANGE_PASSWORD'],
    }),
  );
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const [popUp, setPopup] = useState(false);
  const [newPwd, setNewPwd] = useState('');

  async function getId(x: string) {
    // const newValue = Math.random().toString(36).substring(2, 11);
    // const userData = await read({ data: 'seuha516', type: 'nickname' });
    // dispatch(
    //   changePassword({
    //     id: (userData as { [key: string]: any }).id,
    //     data: { password: newValue },
    //   }),
    // );
    // setNewPwd(newValue);
    // dispatch(changeField({ key: 'authEmail', value: null }));
  }

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Signup';
    if (user) {
      navigate('/');
    } else if (authEmail && read) {
      setPopup(false);
      dispatch(changeField({ key: 'authEmail', value: null }));
      dispatch(changeField({ key: 'read', value: null }));
      const newValue = Math.random().toString(36).substring(2, 11);
      dispatch(
        changePassword({
          id: read.data!.id,
          data: { password: newValue },
        }),
      );
    }

    return () => {
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [navigate, dispatch, user, authEmail]);

  const submit = () => {
    if (state.emailWarning.color !== '#009112') {
      alert('이메일을 확인해 주세요.');
      return;
    }
    stateDispatch({ name: 'authEmailCode', target: { value: '' } });
    setPopup(true);
    dispatch(sendAuthEmail({ email: state.email }));
    //dispatch(userRead({ data: state.email, type: 'email' }));
    dispatch(userRead({ data: 'seuha516', type: 'nickname' }));
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
      <Trapezoid text={'Pwd Find'} />
      <PwdFindContainer>
        <InputItem>
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
        <div
          onClick={submit}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Button value="Login" className="btn btn--grey">
            비밀번호 찾기
          </Button>
        </div>
      </PwdFindContainer>
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

const PwdFindContainer = styled.div`
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
    margin-top: 40px;
    width: 100%;
    max-width: 360px;
  }
`;
const Label = styled.label`
  font-size: 24px;
`;
const InputItem = styled.div`
  width: 100%;
  max-width: 360px;
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

export default PwdFind;
