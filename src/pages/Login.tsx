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
      <LoginContainer action="#">
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
      </LoginContainer>
    </Template>
  );
};
const Template = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: #eee;
`;
const LoginContainer = styled.form`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .form__label {
    font-size: 24px;
    color: #484848;
  }
  .form__input {
    border: none;
    padding: 10px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    background-color: #e3e3e3;
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
