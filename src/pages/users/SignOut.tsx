import React, { useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import {
  changeField,
  checkPassword as userCheckPassword,
  logout,
  remove as userRemove,
} from 'modules/users';
import styled from 'styled-components';

import Button from 'components/common/Button';
import Loading from 'components/common/Loading';

type stateType = {
  currentPassword: string;
};
const initialState: stateType = {
  currentPassword: '',
};
const reducer = (state: stateType, action: any) => {
  const actionName: string = action.name;
  let newValue: string = action.target.value;

  switch (actionName) {
    case 'currentPassword': {
      newValue = newValue.substring(0, 16);
      return {
        ...state,
        [actionName]: newValue,
      };
    }
    default:
      return state;
  }
};

const SignOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, checkPassword, remove } = useSelector(
    ({ users }: RootState) => ({
      user: users.user,
      checkPassword: users.checkPassword,
      remove: users.remove,
    }),
  );

  const [state, stateDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!user || remove) {
      navigate('/');
    }
  }, [navigate, dispatch, user, remove]);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Signout';
    return () => {
      htmlTitle!.innerHTML = 'Plming';
      dispatch(changeField({ key: 'checkPassword', value: null }));
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
  const signout = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      dispatch(userRemove(user!.id));
      dispatch(logout());
    }
  };

  if (!user) {
    return (
      <Wrapper>
        <Loading />
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <TitleText>회원 탈퇴</TitleText>
        {checkPassword || user.social > 0 ? (
          <div>
            회원 탈퇴를 해도 작성한 글과 댓글은 자동으로 삭제되지 않습니다.
          </div>
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
          onClick={checkPassword || user.social > 0 ? signout : submit}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Button value="PwdChange" className="btn btn--grey">
            {checkPassword || user.social > 0 ? '회원 탈퇴' : '비밀번호 확인'}
          </Button>
        </div>
        <MypageText to={`/mypage/${user.nickname}`}>
          마이페이지로 돌아가기
        </MypageText>
      </Wrapper>
    );
  }
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

export default SignOut;
