import React from 'react';
import Button from 'components/Button';
import Trapezoid from 'components/TrapezoidBox';
import styled from 'styled-components';
import SignTemplate from 'components/SignTemplate';
function SignUp() {
  return (
    <SignTemplate>
      <Form action="" className="form">
        <FormGrid>
          <FormItem>
            <Label htmlFor="inputName" className="form__label">
              username
            </Label>
            <InputText
              type="text"
              id="inputName"
              className="form__input"
              placeholder="input name"
              name="username"
              required
            />
            <SubText>6자 이상 12자 이하의 영어, 숫자만 사용 가능</SubText>
          </FormItem>
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
            <Label htmlFor="inputPwd" className="form__label">
              Passward
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
            <Label htmlFor="inputPwdContirm" className="form__label">
              Passward Contirm
            </Label>
            <InputText
              type="password"
              name="passwordContrim"
              id="inputPwdContirm"
              className="form__input"
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
      <Trapezoid text={'회원가입'} />
    </SignTemplate>
  );
}
const ClauseCheck = styled.input``;
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
