import Button from 'components/Button';
import SignTemplate from 'components/SignTemplate';
import Trapezoid from 'components/TrapezoidBox';
import React from 'react';
import styled from 'styled-components';

const Login = () => {
  return (
    <SignTemplate>
      <Trapezoid text={'login'} />

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
          <a href="/pwd_find">비밀번호 찾기</a>
          <a href="/join">회원가입</a>
        </LinkConatiner>
        <SocialContainer className="social">
          <div className="social__title"></div>
          <div className="social__icons">
            <img src={require('assets/images/google-icon.png')} alt="" />
            <img src={require('assets/images/git-icon.png')} alt="" />
          </div>
        </SocialContainer>
      </LoginContainer>
    </SignTemplate>
  );
};
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
