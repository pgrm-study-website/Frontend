import client from './client';

export const list = (payload: number) =>
  client.get(`posts/${payload}/application/users`);
export const write = (payload: number) =>
  client.post(`posts/${payload}/application`);
export const read = (payload: number) =>
  client.get(`posts/${payload}/application`);
export const update = (payload: updateRequestType) =>
  client.patch(
    `posts/${payload.postId}/application?status=${payload.status}&nickname=${payload.nickname}`,
  );
export const remove = (payload: number) =>
  client.delete(`posts/${payload}/application`);

export type updateRequestType = {
  postId: number;
  status: string;
  nickname: string;
};
