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
              placeholder="input email"
            />
            <SubText>6자 이상 12자 이하의 영어, 숫자만 사용 가능</SubText>
          </FormItem>
          <FormItem>
            <Label htmlFor="inputPwd" className="form__label">
              Passward
            </Label>
            <InputText
              type="password"
              id="inputPwd"
              className="form__input"
              placeholder="input password"
            />
            <SubText>6자 이상 12자 이하의 영어, 숫자만 사용 가능</SubText>
          </FormItem>
          <FormItem>
            <Label htmlFor="inputPwdContirm" className="form__label">
              Passward Contirm
            </Label>
            <InputText
              type="password"
              id="inputPwdContirm"
              className="form__input"
              placeholder="input email"
            />
          </FormItem>
          <FormItem>
            <Label htmlFor="inputEmail" className="form__label">
              email
            </Label>
            <InputText
              type="text"
              id="inputEmail"
              className="form__input"
              placeholder="input email"
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
              placeholder="input email"
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
              placeholder="input email"
            />
            <SubText>6자 이상 12자 이하의 영어, 숫자만 사용 가능</SubText>
          </FormItem>
        </FormGrid>
        <ClauseContainer></ClauseContainer>
        <Button value="Login" className="btn btn--grey">
          회원가입
        </Button>
      </Form>
      <Trapezoid text={'회원가입'} />
    </SignTemplate>
  );
}
const ClauseContainer = styled.div``;
const Form = styled.form`
  z-index: 10;
  .btn {
    margin-top: 20px;
  }
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
