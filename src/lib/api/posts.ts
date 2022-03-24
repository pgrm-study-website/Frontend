import client from './client';

export const list = (query: string) => client.get(`posts${query}`);
export const write = (post: postType) => client.post('posts', post);
export const read = (id: number) => client.get(`posts/${id}`);
export const remove = (id: number) => client.delete(`posts/${id}`);
export const update = ({ id, post }: { id: number; post: postType }) =>
  client.patch(`posts/${id}`, post);

export type postListType = {
  postId: number;
  title: string;
  category: number;
  tags: string[];
  status: number;
  participantNum: number;
  participantMax: number;
  period: number;
  viewCount: number;
  createDate: Date;
}[];
export type postType = postInputType & {
  status: number;
  participantNum: number;
  viewCount: number;
  updateDate: Date;
};
export type postInputType = {
  postId: number | null;
  userId: number;
  title: string;
  category: string;
  tags: string[];
  content: string;
  participantMax: number;
  period: number;
};
