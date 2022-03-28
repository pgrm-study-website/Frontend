import client from './client';

export const list = (query: string) => client.get(`posts${query}`);
export const write = (post: postType) => client.post('posts', post);
export const read = (id: number) => client.get(`posts/${id}`);
export const remove = (id: number) => client.delete(`posts/${id}`);
export const update = ({ id, post }: { id: number; post: postType }) =>
  client.patch(`posts/${id}`, post);

// 글 목록에 보여지는 아이템
export type postListItemType = {
  postId: number;
  title: string;
  category: number;
  tags: string[];
  status: number;
  participantNum: number;
  participantMax: number;
  period: number;
  viewCount: number;
};

// 글 읽기에 보여질 모든 정보
export type postType = postInputType & {
  status: number;
  participantNum: number;
  viewCount: number;
  createDate: Date;
  updateDate: Date;
};

// 글 쓰기에 필요한 정보
export type postInputType = {
  postId: number | null;
  userId: number;
  title: string;
  category: number;
  tags: string[];
  content: string;
  participantMax: number;
  period: number;
};
