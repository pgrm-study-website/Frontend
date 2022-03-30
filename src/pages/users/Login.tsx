import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import styled from 'styled-components';

import Button from 'components/common/Button';
import SignTemplate from 'components/users/SignTemplate';
import Trapezoid from 'components/users/TrapezoidBox';

const Login = () => {
  const [input, setInput] = useState({ email: '', password: '' });

  function onSuccess(res: any) {
    console.dir(res);
  }
  const onFailure = (res: any) => {
    alert('google login error');
    console.log('err', res);
  };
  const onSubmit = () => {
    if (input.email === '') {
      alert('이메일을 입력해 주세요.');
      return;
    }
    if (input.password === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    alert(JSON.stringify(input));
  };

  return (
    <SignTemplate>
      <Trapezoid text={'LOGIN'} />

      {/* <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      /> */}

      <LoginContainer>
        <Label htmlFor="inputEmail" className="form__label">
          email
        </Label>
        <InputText
          value={input.email}
          onChange={e => setInput({ ...input, email: e.target.value })}
          type="text"
          id="inputEmail"
          className="form__input"
          placeholder="input email"
        />
        <Label htmlFor="inputPwd" className="form__label">
          password
        </Label>
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
          className="form__input"
          placeholder="input password"
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
            <img src={require('assets/images/google-icon.png')} alt="" />
            <img src={require('assets/images/git-icon.png')} alt="" />
          </Social>
        </SocialContainer>
      </LoginContainer>
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
  padding: 30px 20px 50px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
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

export default Login;
