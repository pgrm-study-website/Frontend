import client from './client';

export const list = (query: string) => client.get(`posts${query}`);
export const write = (post: postType) => client.post('posts', post);
export const read = (id: number) => client.get(`posts/${id}`);
export const remove = (id: number) => client.delete(`posts/${id}`);
export const update = ({ id, post }: { id: number; post: postType }) =>
  client.patch(`posts/${id}`, post);

export type postType = {
  postId: number | null;
  userId: number;
  title: string;
  tags: string[];
  category: string;
  content: string;
};
