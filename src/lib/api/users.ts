import client from './client';

export const register = (user: userInputType) =>
  client.post('users/create/', user);
export const login = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => client.post('users/login', { username, password });
export const check = () => client.get('users/check');
export const logout = () => client.get('users/logout');

// user 관련 모든 정보
export type userType = userSimpleType & {
  introduce: string;
  github: string;
  social: number;
};

// 회원가입할 때 입력하는 정보
export type userInputType = {
  email: string;
  password: string;
  nickname: string;
};

// user 관련 최소한의 정보
export type userSimpleType = {
  email: string;
  nickname: string;
  image: string;
};
