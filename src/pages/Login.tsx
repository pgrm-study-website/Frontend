import React from 'react';
import styled from 'styled-components';
const Login = () => {
  return (
    <Template>
      <div>
        <TrapezoidStyle />
        <TextContainer>
          <span className="page-text text--large">플밍</span>
          <span className="page-text">login</span>
        </TextContainer>
      </div>
      <LoginContainer>
        <form action="" className="form">
          <label htmlFor="inputEmail" className="form__label">
            email
          </label>
          <input
            type="text"
            id="inputEmail"
            className="form__input"
            placeholder="input email"
          />
          <label htmlFor="inputPwd" className="form__label">
            password
          </label>
          <input
            type="text"
            id="inputPwd"
            className="form__input"
            placeholder="password"
          />
          <input type="submit" value="Login submit" className="form__submit" />
        </form>
        <LinkConatiner>
          <div>ID / PW 찾기</div>
          <div>회원가입</div>
        </LinkConatiner>
        <SocialContainer className="social">
          <div className="social__title"></div>
          <div className="social__icons">
            <img src={require('../assets/image/google-icon.png')} alt="" />
            <img src={require('../assets/image/google-icon.png')} alt="" />
          </div>
        </SocialContainer>
      </LoginContainer>
    </Template>
  );
};
const LinkConatiner = styled.div`
  padding: 30px 0;
  display: flex;
  justify-content: space-around;
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

const Template = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  color: #484848;
  background-color: #eee;
`;
const LoginContainer = styled.div`
  z-index: 10;
  width: 300px;
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .form__label {
    font-size: 24px;
  }
  .form__input {
    border: none;
    padding: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #e3e3e3;
  }
  .form__submit {
    border: none;
    color: #484848;
    padding: 10px;
    font-size: 20px;
    width: 100%;
    height: 40px;
  }
`;
const TrapezoidStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 200px solid transparent;
  border-left: 100vw solid #4cbbc2;
  &::before {
    content: '';
    height: 130px;
    display: block;
  }
`;
const TextContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 100px;
  font-size: 64px;
  color: #fff;
  .text--large {
    font-size: 100px;
    margin-right: 50px;
  }
`;
export default Login;
