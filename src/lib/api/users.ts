import client from './client';

/*
  axios 요청 함수들

  export로 외부에서 이용 가능하게 하고,
  parameter로 payload를 받습니다. type을 따로 만들어서 연결해주세요.
  (payload는 사용에 있어서 전송되는 데이터라는 뜻입니다.)

  return value는 client.[HTTP METHOD]([URL 주소], [REQUEST BODY?]) 형식입니다.
*/
export const signup = (payload: signupRequestType) =>
  client.post('users/', payload);
export const login = (payload: loginRequestType) =>
  client.post('users/login', payload);
export const check = () => client.get('users/check');
export const logout = () => client.get('users/logout');

export const sendAuthEmail = (payload: sendAuthEmailRequestType) =>
  client.post('users/email/send-code', payload);
export const checkAuthEmail = (payload: checkAuthEmailRequestType) =>
  client.post('users/email/verify-code', payload);

export const read = (payload: readRequestType) => {
  if (payload.type === 'id') {
    return client.get(`users/id/${payload.data}`);
  } else if (payload.type === 'nickname') {
    return client.get(`users/nickname/${payload.data}`);
  } else {
    return client.get(`users/email/${payload.data}`);
  }
};
export const update = (payload: updateRequestType) =>
  client.patch(`users/${payload.id}`, payload.data);
export const remove = (payload: number) => client.get(`users/${payload}`);

export const checkPassword = (payload: passwordRequsetType) =>
  client.post(`users/${payload.id}/password-check`, payload.data);
export const changePassword = (payload: passwordRequsetType) =>
  client.patch(`users/${payload.id}/password`, payload.data);

// 타입 이름은 자유이나 저는 RequestType, ResponseType으로 최대한 통일했습니다.
export type signupRequestType =
  | {
      social: number;
      email: string;
      nickname: string;
      password: string;
    }
  | {
      social: number;
      code: string;
    };
export type loginRequestType =
  | {
      social: number;
      email: string;
      password: string;
    }
  | {
      social: number;
      code: string;
    };
export type simpleResponseType = {
  id: number;
  nickname: string;
  image: string;
};
export type readRequestType = {
  data: number | string;
  type: string;
};
export type readResponseType = {
  id: number;
  email: string | null;
  nickname: string;
  image: string;
  introduce: string;
  github: string;
  tags: string[];
};
export type updateRequestType = {
  id: number;
  data: {
    nickname: string;
    image: string;
    introduce: string;
    github: string;
    tags: string[];
  };
};
export type sendAuthEmailRequestType = {
  email: string;
};
export type checkAuthEmailRequestType = {
  email: string;
  code: string;
};
export type passwordRequsetType = {
  id: number;
  data: {
    password: string;
  };
};
