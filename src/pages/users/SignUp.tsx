import React, { useState } from 'react';
import Button from 'components/common/Button';
import Trapezoid from 'components/users/TrapezoidBox';
import styled from 'styled-components';
import SignTemplate from 'components/users/SignTemplate';

function SignUp() {
  const [input, setInput] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const onSubmit = () => {
    alert(JSON.stringify(input));
  };

  return (
    <SignTemplate>
      <Trapezoid text={'SIGN UP'} />
      <SignupContainer>
        <FormGrid>
          <FormItem>
            {/* 자동완성 무효화 */}
            <input type="text" style={{ width: 0, height: 0, border: 0 }} />
            <input type="password" style={{ width: 0, height: 0, border: 0 }} />
            <Label htmlFor="inputEmail" className="form__label">
              email
            </Label>
            <InputText
              value={input.email}
              onChange={e => setInput({ ...input, email: e.target.value })}
              type="text"
              id="inputEmail"
              className="form__input"
              name="email"
              placeholder="input email"
              required
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="inputNickname" className="form__label">
              nickname
            </Label>
            <InputText
              value={input.nickname}
              onChange={e => setInput({ ...input, nickname: e.target.value })}
              type="text"
              name="nickname"
              id="inputNickname"
              className="form__input"
              placeholder="input nickname"
              required
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="inputPwd" className="form__label">
              password
            </Label>
            <InputText
              value={input.password}
              onChange={e => setInput({ ...input, password: e.target.value })}
              type="password"
              id="inputPwd"
              name="password"
              className="form__input"
              placeholder="input password"
              required
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="inputPwdConfirm" className="form__label">
              password Confirm
            </Label>
            <InputText
              value={input.passwordConfirm}
              onChange={e =>
                setInput({ ...input, passwordConfirm: e.target.value })
              }
              type="password"
              name="passwordConfirm"
              id="inputPwdConfirm"
              className="form__input"
              placeholder="input password"
              required
            />
          </FormItem>
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
const FormItem = styled.div``;
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

export default SignUp;
