import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import { login } from 'modules/users';
import qs from 'qs';
import styled from 'styled-components';

import Button from 'components/common/Button';
import SignTemplate from 'components/users/SignTemplate';
import Trapezoid from 'components/users/TrapezoidBox';
import { LoadingBox } from 'components/common/Loading';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // 리덕스 액션을 실행시키는 useDispatch

  const { social } = useParams();
  const { code } = qs.parse(location.search, { ignoreQueryPrefix: true });
  const { user, loading } = useSelector(({ users, loading }: RootState) => ({
    user: users.user,
    loading: loading['users/LOGIN'],
  })); // 리덕스 state를 가져오는 useSelector
  const [input, setInput] = useState({ email: '', password: '' });

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Login';
    if (user) {
      /*
        리덕스 state 사용하기

        리덕스 state의 users.user 값이 바뀔 때마다 useEffect가 실행됩니다.
        아래에서는 user값이 null이 아닐 때 메인 페이지로 강제 이동시키고 있습니다.
        이는 로그인한 사용자가 /login에 들어오면 쫓아내거나,
        로그인에 성공해서 user값이 non-null로 바뀌면 자연스럽게 메인 페이지로 이동시키는 효과입니다.
      */
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    } else if (social) {
      if (code) {
        dispatch(login({ social: parseInt(social), code: code as string }));
      } else {
        navigate('/');
      }
    }

    return () => {
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [navigate, dispatch, user, social, code]);

  const onSubmit = () => {
    if (input.email === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (input.password === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    dispatch(login({ ...input, social: 0 })); // 입력한 값을 payload로 보내서 액션 실행
  };

  return (
    <SignTemplate>
      <Trapezoid text={'LOGIN'} />
      <div style={{ display: 'none' }}>
        <a href={process.env.REACT_APP_GOOGLE_LOGIN} id="Google_Login" />
        <a href={process.env.REACT_APP_KAKAO_LOGIN} id="Kakao_Login" />
        <a href={process.env.REACT_APP_GITHUB_LOGIN} id="Github_Login" />
      </div>
      {loading ? (
        <LoginContainer>
          <LoadingBox r="100px" />
        </LoginContainer>
      ) : social ? (
        <LoginContainer>
          <SocialLoginError>Error..</SocialLoginError>
          <SocialLoginErrorButton to="/login">
            Back to Login
          </SocialLoginErrorButton>
        </LoginContainer>
      ) : (
        <LoginContainer>
          <Label htmlFor="inputEmail">Email</Label>
          <InputText
            value={input.email}
            onChange={e => setInput({ ...input, email: e.target.value })}
            type="text"
            id="inputEmail"
            placeholder="Input Email"
          />
          <Label htmlFor="inputPwd">Password</Label>
          <InputText
            value={input.password}
            onChange={e => setInput({ ...input, password: e.target.value })}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}
            type="password"
            id="inputPwd"
            placeholder="Input Password"
          />
          <div onClick={onSubmit}>
            <Button value="Login" className="btn--grey">
              로그인
            </Button>
          </div>
          <LinkContainer>
            <Link to="/pwd_find">비밀번호 찾기</Link>
            <Link to="/signup">회원가입</Link>
          </LinkContainer>
          <SocialContainerText>소셜 로그인</SocialContainerText>
          <SocialContainer className="social">
            <Social className="social__icons">
              <img
                src={require('assets/images/google-icon.png')}
                alt="google"
                onClick={() => {
                  document.getElementById('Google_Login')?.click();
                }}
              />
              <img
                src={require('assets/images/kakao-icon.png')}
                alt="kakao"
                onClick={() => {
                  document.getElementById('Kakao_Login')?.click();
                }}
              />
              <img
                src={require('assets/images/git-icon.png')}
                alt="git"
                onClick={() => {
                  document.getElementById('Github_Login')?.click();
                }}
              />
            </Social>
          </SocialContainer>
        </LoginContainer>
      )}
    </SignTemplate>
  );
};

const LoginContainer = styled.div`
  width: 100%;
  max-width: 340px;
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
  gap: 15px;
  .btn--grey {
    margin-top: 20px;
  }
`;
const Label = styled.label`
  font-size: 24px;
  margin-top: 5px;
`;
const InputText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #e3e3e3;
`;
const LinkContainer = styled.div`
  padding: 10px 0 30px 0;
  font-family: NanumSquareR;
  display: flex;
  justify-content: space-around;
  a {
    width: 100px;
    text-align: center;
  }
`;
const SocialContainerText = styled.div`
  width: 100%;
  text-align: center;
  font-size: 18px;
  font-family: NanumSquareR;
  margin: 20px 0 15px 0;
  padding-bottom: 5px;
  border-bottom: 1px solid grey;
`;
const SocialContainer = styled.div`
  margin-top: -10px;
  .social__icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    img {
      width: 50px;
      background-color: #ffffff;
      border-radius: 50px;
    }
  }
`;
const Social = styled.div`
  cursor: pointer;
  img {
    &:hover {
      transition: all 0.5s;
      filter: brightness(80%);
    }
  }
`;
const SocialLoginError = styled.div`
  text-align: center;
  font-size: 60px;
  font-family: 'Red Hat Mono', monospace;
  font-weight: 700;
  margin-bottom: 50px;
`;
const SocialLoginErrorButton = styled(Link)`
  text-align: center;
  font-size: 24px;
  font-family: 'Press Start 2P', cursive;
  line-height: 36px;
  color: #757575;
  transition: color 0.15s linear;
  &:hover {
    color: #000000;
  }
`;

export default Login;
