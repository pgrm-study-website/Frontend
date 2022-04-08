import client from './client';

export const signup = (payload: signupRequestType) =>
  client.post('users/', payload);
export const login = (payload: loginRequestType) =>
  client.post('login', payload); // 임시
export const check = () => client.get('users/check');
export const logout = () => client.get('users/logout');

export const sendAuthEmail = (payload: sendAuthEmailRequestType) =>
  client.post('email/send-code', payload); // 임시
export const checkAuthEmail = (payload: checkAuthEmailRequestType) =>
  client.post('email/verify-code', payload); // 임시

export const read = (payload: number) => client.get(`users/${payload}`);
export const update = (payload: updateRequestType) =>
  client.patch(`users/${payload.id}`, payload.data);
export const remove = (payload: number) => client.get(`users/${payload}`);

export const checkPassword = (payload: passwordRequsetType) =>
  client.post(`users/${payload.id}/password-check`, payload.data);
export const changePassword = (payload: passwordRequsetType) =>
  client.patch(`users/${payload.id}/password`, payload.data);

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

export type readResponseType = {
  email: string | null;
  nickname: string;
  image: string;
  introduce: string;
  github: string;
  tag: string[];
};

export type updateRequestType = {
  id: number;
  data: {
    nickname?: string;
    image?: string;
    introduce?: string;
    github?: string;
    tag?: string[];
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
