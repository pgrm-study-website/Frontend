import React from 'react';
import Button from 'components/common/Button';
import Trapezoid from 'components/users/TrapezoidBox';
import styled from 'styled-components';
import SignTemplate from 'components/users/SignTemplate';
function SignUp() {
  return (
    <SignTemplate>
      <Form action="" className="form" autoComplete="off">
        <FormGrid>
          <FormItem>
            <Label htmlFor="inputEmail" className="form__label">
              email
            </Label>
            <InputText
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
        <Button value="Login" className="btn btn--grey">
          회원가입
        </Button>
      </Form>
      <Trapezoid text={'SIGN UP'} />
    </SignTemplate>
  );
}
const ClauseCheck = styled.input`
  cursor: pointer;
`;
const ClauseContainer = styled.div`
  margin: 20px 0;
`;
const Form = styled.form`
  z-index: 10;
`;
const FormGrid = styled.div`
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;
const FormItem = styled.div``;
const SubText = styled.div``;
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

export default SignUp;
