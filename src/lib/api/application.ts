import client from './client';
import { simpleResponseType } from './users';

export const list = (payload: number) =>
  client.get(`posts/${payload}/application/users`);
export const write = (payload: number) =>
  client.post(`posts/${payload}/application`);
export const update = (payload: updateRequestType) =>
  client.patch(
    `posts/${payload.postId}/application?status=${payload.status}&nickname=${payload.nickname}`,
  );

export type updateRequestType = {
  postId: number;
  status: string;
  nickname: string;
};
export type listResponseType = listItemType[];
export type listItemType = {
  user: simpleResponseType;
  status: string;
};
