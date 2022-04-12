import client from './client';

export const list = (payload: string) => client.get(`posts${payload}`);
export const myList = () => client.get(`posts/user`);
export const write = (payload: writeRequestType) =>
  client.post('posts', payload);
export const read = (payload: number) => client.get(`posts/${payload}`);
export const remove = (payload: number) => client.delete(`posts/${payload}`);
export const update = (payload: updateRequestType) =>
  client.patch(`posts/${payload.id}`, payload.data);

export type writeRequestType = {
  title: string;
  category: string;
  content: string;
  tagIds: number[];
  participantMax: number | null;
  period: number | null;
  status: string;
};

export type updateRequestType = {
  id: number;
  data: writeRequestType;
};

export type listResponseType = postListItemType[];

export type postListItemType = {
  id: number;
  title: string;
  category: string;
  tags: string[];
  status: string;
  participantNum: number;
  participantMax: number | null;
  viewCnt: number;
};

export type readResponseType = {
  id: number;
  userId: number;
  title: string;
  category: string;
  status: string;
  content: string;
  period: number | null;
  participantNum: number;
  participantMax: number | null;
  tags: string[];
  viewCnt: number;
  createDate: Date;
  updateDate: Date;
  deleteYn: string;
};
