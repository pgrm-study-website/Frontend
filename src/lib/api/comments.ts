import client from './client';

export const list = (payload: number) =>
  client.get(`posts/${payload}/comments`);
export const write = (payload: writeRequestType) =>
  client.post(`posts/${payload.id}/comments`, payload.data);
export const remove = (payload: number) =>
  client.delete(`comments?commentId=${payload}`);

export type writeRequestType = {
  id: number;
  data: { parentId: number | null; content: string };
};
export type commentType = {
  id: number;
  userId: number;
  content: string;
  createDate: Date;
  deleteYn: string;
  recomment: {
    id: number;
    parentId: number;
    userId: number;
    content: string;
    createDate: Date;
    deleteYn: string;
  }[];
  recommentSize: number;
};
