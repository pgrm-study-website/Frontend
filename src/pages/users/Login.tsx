import React from 'react';
// import GoogleLogin from 'react-google-login';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from 'components/common/Button';
import SignTemplate from 'components/users/SignTemplate';
import Trapezoid from 'components/users/TrapezoidBox';

const Login = () => {
  function onSuccess(res: any) {
    console.dir(res);
  }
  const onFailure = (res: any) => {
    alert('google login error');
    console.log('err', res);
  };

  return (
    <SignTemplate>
      <Trapezoid text={'LOGIN'} />

      {/* 미구현 
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ''}
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        cookiePolicy={'single_host_origin'}
      /> */}

      <LoginContainer>
        <form action="" className="form">
          <Label htmlFor="inputEmail" className="form__label">
            email
          </Label>
          <InputText
            type="text"
            id="inputEmail"
            className="form__input"
            placeholder="input email"
          />
          <Label htmlFor="inputPwd" className="form__label">
            password
          </Label>
          <InputText
            type="text"
            id="inputPwd"
            className="form__input"
            placeholder="input password"
          />

          <Button value="Login" className="btn--grey">
            Login
          </Button>
        </form>
        <LinkConatiner>
          <Link to="/pwd_find">비밀번호 찾기</Link>
          <Link to="/signup">회원가입</Link>
        </LinkConatiner>
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
const Social = styled.div`
  cursor: pointer;
  img {
    &:hover {
      transition: all 0.5s;
      filter: brightness(80%);
    }
  }
`;
const LinkConatiner = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: space-around;
`;
const LinkItem = styled.div`
  text-align: center;
`;
const SocialContainer = styled.div`
  .social__title {
  }
  .social__icons {
    display: flex;
    justify-content: center;
    gap: 20px;

    img {
      width: 50px;
    }
  }
`;
const Label = styled.label`
  font-size: 24px;
`;
const InputText = styled.input`
  border: none;
  padding: 10px;
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: #e3e3e3;
`;

const LoginContainer = styled.div`
  z-index: 10;
  width: 300px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .btn--grey {
    margin-top: 20px;
  }
`;

export default Login;
