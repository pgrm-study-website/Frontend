import React, { useState, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { RootState } from 'modules';
import {
  changeField,
  checkAuthEmail,
  sendAuthEmail,
  signup,
} from 'modules/users';
import styled from 'styled-components';

import Trapezoid from 'components/users/TrapezoidBox';
import SignTemplate from 'components/users/SignTemplate';
import Button from 'components/common/Button';
import { LoadingBox } from 'components/common/Loading';

type stateType = {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
  emailWarning: {
    content: string;
    color: string;
  };
  nicknameWarning: {
    content: string;
    color: string;
  };
  passwordWarning: {
    content: string;
    color: string;
  };
  passwordConfirmWarning: {
    content: string;
    color: string;
  };
  checkClause: boolean;
  authEmailCode: string;
};
const initialState: stateType = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirm: '',
  emailWarning: {
    content: '',
    color: '#686868',
  },
  nicknameWarning: {
    content: '* 2자 이상 8자 이하',
    color: '#686868',
  },
  passwordWarning: {
    content: '* 8 ~ 16자 영문 + 숫자 + 기호',
    color: '#686868',
  },
  passwordConfirmWarning: {
    content: '',
    color: '#686868',
  },
  checkClause: false,
  authEmailCode: '',
};
const reducer = (state: stateType, action: any) => {
  const actionName: string = action.name;
  let newValue: string = action.target.value;
  const newWarning = {
    content: '',
    color: '',
  };

  switch (actionName) {
    case 'email': {
      newValue = newValue.substring(0, 45);
      const emailRegex =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
      if (newValue.length === 0) {
        newWarning.content = '';
        newWarning.color = '#686868';
      } else if (emailRegex.test(newValue)) {
        newWarning.content = '* 올바른 이메일 형식입니다.';
        newWarning.color = '#009112';
      } else {
        newWarning.content = '* 올바른 이메일 형식이 아닙니다.';
        newWarning.color = '#ff3939';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'nickname': {
      newWarning.content = '* 2자 이상 8자 이하';
      newValue = newValue.substring(0, 8);
      if (newValue.length >= 2 && newValue.length <= 8) {
        newWarning.color = '#009112';
      } else if (newValue.length === 0) {
        newWarning.color = '#686868';
      } else {
        newWarning.color = '#ff3939';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'password': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      if (passwordPattern.test(newValue)) {
        newWarning.content = '* 한글을 입력할 수 없습니다..';
        newValue = newValue.replace(passwordPattern, '');
      } else {
        newWarning.content = '* 8 ~ 16자 영문 + 숫자 + 기호';
      }
      newValue = newValue.substring(0, 16);
      if (newValue.length >= 8 && newValue.length <= 16) {
        newWarning.color = '#009112';
      } else if (newValue.length === 0) {
        newWarning.color = '#686868';
      } else {
        newWarning.color = '#ff3939';
      }
      if (
        newValue === state.passwordConfirm &&
        state.passwordConfirm.length > 0
      ) {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
          passwordConfirmWarning: {
            content: '* 비밀번호가 일치합니다.',
            color: '#009112',
          },
        };
      } else if (state.passwordConfirm.length > 0) {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
          passwordConfirmWarning: {
            content: '* 비밀번호가 일치하지 않습니다.',
            color: '#ff3939',
          },
        };
      } else {
        return {
          ...state,
          [actionName]: newValue,
          [actionName + 'Warning']: newWarning,
        };
      }
    }
    case 'passwordConfirm': {
      const passwordPattern = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
      newValue = newValue.replace(passwordPattern, '');
      newValue = newValue.substring(0, 16);
      if (newValue.length === 0) {
        newWarning.content = '';
        newWarning.color = '#686868';
      } else if (newValue === state.password) {
        newWarning.content = '* 비밀번호가 일치합니다.';
        newWarning.color = '#009112';
      } else {
        newWarning.content = '* 비밀번호가 일치하지 않습니다.';
        newWarning.color = '#ff3939';
      }
      return {
        ...state,
        [actionName]: newValue,
        [actionName + 'Warning']: newWarning,
      };
    }
    case 'checkClause': {
      return { ...state, checkClause: !state.checkClause };
    }
    case 'authEmailCode': {
      return { ...state, authEmailCode: action.target.value };
    }
    default:
      return state;
  }
};

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, authEmail, loading } = useSelector(
    ({ users, loading }: RootState) => ({
      user: users.user,
      authEmail: users.authEmail,
      loading: loading['users/SIGNUP'],
    }),
  );
  const [state, stateDispatch] = useReducer(reducer, initialState);
  const [fold, setFold] = useState(false);
  const [popUp, setPopup] = useState(false);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Signup';
    if (user) {
      navigate('/');
      try {
        localStorage.setItem('user', JSON.stringify(user));
      } catch (e) {
        console.log('localStorage is not working');
      }
    } else if (authEmail) {
      setPopup(false);
      dispatch(
        signup({
          email: state.email,
          nickname: state.nickname,
          password: state.password,
        }),
      );
      dispatch(changeField({ key: 'authEmail', value: null }));
    }

    return () => {
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [navigate, dispatch, user, authEmail]);

  const submit = () => {
    if (state.emailWarning.color !== '#009112') {
      alert('이메일을 확인해 주세요.');
      return;
    } else if (state.nicknameWarning.color !== '#009112') {
      alert('닉네임을 확인해 주세요.');
      return;
    } else if (
      state.passwordWarning.color !== '#009112' ||
      state.passwordConfirmWarning.color !== '#009112'
    ) {
      alert('비밀번호를 확인해 주세요.');
      return;
    } else if (!state.checkClause) {
      alert('약관에 동의해 주세요.');
      return;
    }
    stateDispatch({ name: 'authEmailCode', target: { value: '' } });
    setPopup(true);
    dispatch(sendAuthEmail({ email: state.email }));
  };
  const sendAgain = () => {
    dispatch(sendAuthEmail({ email: state.email }));
    stateDispatch({ name: 'authEmailCode', target: { value: '' } });
    alert(`${state.email}로 인증 코드를 다시 보냈습니다.`);
  };
  const checkAuthEmailCode = () => {
    if (state.authEmailCode.length !== 6) {
      alert('6자리 코드를 입력해주세요.');
      return;
    }
    dispatch(checkAuthEmail({ email: state.email, code: state.authEmailCode }));
  };

  return (
    <SignTemplate>
      <Trapezoid text={'SIGN UP'} />
      {loading ? (
        <SignupContainer>
          <LoadingBox r="100px" />
        </SignupContainer>
      ) : (
        <SignupContainer>
          <FormGrid>
            <ColumnBox>
              <InputItem>
                <input type="text" style={{ width: 0, height: 0, border: 0 }} />
                <input
                  type="password"
                  style={{ width: 0, height: 0, border: 0 }}
                />
                <Label htmlFor="inputEmail">Email</Label>
                <InputText
                  value={state.email}
                  onChange={e => stateDispatch({ ...e, name: 'email' })}
                  type="text"
                  id="inputEmail"
                  placeholder="Input Email"
                />
                <Warning color={state.emailWarning.color}>
                  {state.emailWarning.content}
                </Warning>
              </InputItem>
              <InputItem>
                <Label htmlFor="inputNickname">Nickname</Label>
                <InputText
                  value={state.nickname}
                  onChange={e => stateDispatch({ ...e, name: 'nickname' })}
                  type="text"
                  id="inputNickname"
                  placeholder="Input Nickname"
                />
                <Warning color={state.nicknameWarning.color}>
                  {state.nicknameWarning.content}
                </Warning>
              </InputItem>
            </ColumnBox>
            <ColumnBox>
              <InputItem>
                <Label htmlFor="inputPwd">Password</Label>
                <InputText
                  value={state.password}
                  onChange={e => stateDispatch({ ...e, name: 'password' })}
                  type="password"
                  id="inputPwd"
                  placeholder="Input Password"
                />
                <Warning color={state.passwordWarning.color}>
                  {state.passwordWarning.content}
                </Warning>
              </InputItem>
              <InputItem>
                <Label htmlFor="inputPwdConfirm">Password Confirm</Label>
                <InputText
                  value={state.passwordConfirm}
                  onChange={e =>
                    stateDispatch({ ...e, name: 'passwordConfirm' })
                  }
                  type="password"
                  id="inputPwdConfirm"
                  placeholder="Password Confirm"
                />
                <Warning color={state.passwordConfirmWarning.color}>
                  {state.passwordConfirmWarning.content}
                </Warning>
              </InputItem>
            </ColumnBox>
          </FormGrid>
          <ClauseContainer>
            <ClauseCheck
              checked={state.checkClause}
              onChange={e => stateDispatch({ ...e, name: 'checkClause' })}
              type="checkbox"
              id="clauseCheck"
            />
            <label htmlFor="clauseCheck">약관 동의</label>
            <ClauseFoldText onClick={() => setFold(!fold)}>
              {fold ? '(약관 접기)' : '(약관 보기)'}
            </ClauseFoldText>
          </ClauseContainer>
          {fold && (
            <ClauseContentWrapper>
              <Clause />
            </ClauseContentWrapper>
          )}
          <div
            onClick={submit}
            style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button value="Login" className="btn btn--grey">
              회원가입
            </Button>
          </div>
          <SocialContainerText to="/login">
            소셜 로그인하러 가기
          </SocialContainerText>
        </SignupContainer>
      )}
      {popUp && (
        <AuthEmailBackground>
          <AuthEmailWrapper>
            <CloseIconWrapper>
              <AiOutlineClose onClick={() => setPopup(false)} />
            </CloseIconWrapper>
            <AuthEmailMessage>
              {`${state.email}로 인증 코드를 보냈습니다.`}
            </AuthEmailMessage>
            <AuthEmailInput
              value={state.authEmailCode}
              onChange={e => stateDispatch({ ...e, name: 'authEmailCode' })}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  checkAuthEmailCode();
                }
              }}
            />
            <AuthEmailButtonWrapper>
              <AuthEmailSendAgain onClick={sendAgain}>
                재전송
              </AuthEmailSendAgain>
              <AuthEmailSignup onClick={checkAuthEmailCode}>
                확인
              </AuthEmailSignup>
            </AuthEmailButtonWrapper>
          </AuthEmailWrapper>
        </AuthEmailBackground>
      )}
    </SignTemplate>
  );
}

const Clause = () => {
  return (
    <>
      <p>{`< 플밍 >('https://plming.netlify.app/'이하 '플밍')은(는) 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.`}</p>
      <p>{`○ 이 개인정보처리방침은 2022년 4월 25부터 적용됩니다.`}</p>
      <br />
      <p>{`제1조(개인정보의 처리 목적)`}</p>
      <p>{`< 플밍 >('https://plming.netlify.app/'이하 '플밍')은(는) 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.`}</p>
      <p>{`1. 홈페이지 회원가입 및 관리`}</p>
      <p>{`회원 가입의사 확인, 회원제 서비스 제공에 따른 본인 식별·인증, 회원자격 유지·관리 목적으로 개인정보를 처리합니다.`}</p>
      <p>{`2. 재화 또는 서비스 제공`}</p>
      <p>{`서비스 제공을 목적으로 개인정보를 처리합니다.`}</p>
      <br />
      <p>{`제2조(개인정보의 처리 및 보유 기간)`}</p>
      <p>{`① < 플밍 >은(는) 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.`}</p>
      <br />
      <p>{`제3조(처리하는 개인정보의 항목)`}</p>
      <p>{`① < 플밍 >은(는) 다음의 개인정보 항목을 처리하고 있습니다.`}</p>
      <p>{`< 홈페이지 회원가입 및 관리 >`}</p>
      <p>{`필수항목 : 이메일, 비밀번호, 로그인ID`}</p>
      <br />
      <p>{`제4조(개인정보의 파기절차 및 파기방법)`}</p>
      <p>{`① < 플밍 > 은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.`}</p>
      <p>{`② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.`}</p>
      <p>{`③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.`}</p>
      <p>{`< 플밍 > 은(는) 파기 사유가 발생한 개인정보를 선정하고, < 플밍 > 의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.`}</p>
      <br />
      <p>{`제5조(정보주체와 법정대리인의 권리·의무 및 그 행사방법에 관한 사항)`}</p>
      <p>{`① 정보주체는 플밍에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.`}</p>
      <p>{`② 제1항에 따른 권리 행사는플밍에 대해 「개인정보 보호법」 시행령 제41조제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며 플밍은(는) 이에 대해 지체 없이 조치하겠습니다.`}</p>
      <p>{`③ 제1항에 따른 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다.이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.`}</p>
      <p>{`④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.`}</p>
      <p>{`⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.`}</p>
      <p>{`⑥ 플밍은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.`}</p>
      <br />
      <p>{`제6조(개인정보의 안전성 확보조치에 관한 사항)`}</p>
      <p>{`< 플밍 >은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.`}</p>
      <p>{`1. 개인정보의 암호화`}</p>
      <p>{`이용자의 개인정보는 비밀번호는 암호화 되어 저장 및 관리되고 있어, 본인만이 알 수 있으며 중요한 데이터는 파일 및 전송 데이터를 암호화 하거나 파일 잠금 기능을 사용하는 등의 별도 보안기능을 사용하고 있습니다.`}</p>
      <br />
      <p>{`제7조(개인정보를 자동으로 수집하는 장치의 설치·운영 및 그 거부에 관한 사항)`}</p>
      <p>{`① 플밍 은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다.`}</p>
      <p>{`② 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 저장되기도 합니다.`}</p>
      <p>{`가. 쿠키의 사용 목적 : 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부, 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.`}</p>
      <p>{`나. 쿠키의 설치•운영 및 거부 : 웹브라우저 상단의 도구>인터넷 옵션>개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부 할 수 있습니다.`}</p>
      <p>{`다. 쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.`}</p>
      <br />
      <p>{`제10조(정보주체의 권익침해에 대한 구제방법)`}</p>
      <p>{`정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.`}</p>
      <p>{`1. 개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)`}</p>
      <p>{`2. 개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)`}</p>
      <p>{`3. 대검찰청 : (국번없이) 1301 (www.spo.go.kr)`}</p>
      <p>{`4. 경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)`}</p>
      <p>{`「개인정보보호법」제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.`}</p>
      <p>{`※ 행정심판에 대해 자세한 사항은 중앙행정심판위원회(www.simpan.go.kr) 홈페이지를 참고하시기 바랍니다.`}</p>
    </>
  );
};

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
  padding: 40px 20px 80px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .btn--grey {
    margin-top: 20px;
    width: 100%;
    max-width: 360px;
  }
`;
const FormGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  @media all and (max-width: 900px) {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    gap: 20px;
  }
`;
const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Label = styled.label`
  font-size: 24px;
`;
const InputItem = styled.div`
  height: 100px;
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
const Warning = styled.div<{ color: string }>`
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -1px;
  margin-top: 2px;
  color: ${props => props.color};
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
const ClauseFoldText = styled.div`
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.5px;
  color: #646464;
  margin-left: 7.5px;
  cursor: pointer;
`;
const ClauseContentWrapper = styled.div`
  width: 100%;
  height: 300px;
  background-color: #46464622;
  word-break: break-all;
  font-size: 15px;
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 20px;
  padding: 10px;
  overflow: auto;
  margin-bottom: 25px;
  animation: smoothAppear 0.2s ease-in-out 0s 1 normal forwards;
  @keyframes smoothAppear {
    from {
      height: 0px;
    }
    to {
      height: 200px;
    }
  }
  word-break: break-all;
`;
const AuthEmailBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000c1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;
const AuthEmailWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;
const CloseIconWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  svg {
    width: 25px;
    height: 25px;
    cursor: pointer;
  }
`;
const AuthEmailMessage = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: NanumSquareR;
  line-height: 28px;
`;
const AuthEmailInput = styled.input`
  width: 200px;
  margin-top: 20px;
  border: 0;
  border-bottom: 2px solid black;
  text-align: center;
  font-size: 36px;
`;
const AuthEmailButtonWrapper = styled.div`
  margin-top: 25px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  div {
    cursor: pointer;
  }
`;
const AuthEmailSendAgain = styled.div`
  font-size: 16px;
  letter-spacing: -0.5px;
  color: #464646;
  margin-right: 20px;
`;
const AuthEmailSignup = styled.div`
  font-size: 20px;
`;
const SocialContainerText = styled(Link)`
  width: 100%;
  text-align: center;
  font-size: 17px;
  font-family: NanumSquareR;
  margin: 20px 0 10px 0;
`;

export default SignUp;
