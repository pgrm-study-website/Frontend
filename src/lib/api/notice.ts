import client from './client';

export const create = (payload: number) => client.post('notices', payload);
export const read = () => client.get(`notifications`);
export const readOne = (payload: number) =>
  client.get(`notifications/${payload}`);
export const removeAll = () => client.delete(`notifications`);
export const removeOne = (payload: number) =>
  client.delete(`notifications?id=${payload}`);

export type notificationProps = {
  id: number;
  content: string;
  url: string;
  createDate: string;
  type: 'apply' | 'accept' | 'reject' | 'comment' | 'recomment' | 'message';
  user_id?: number;
  is_read?: boolean;
  update_date?: Date;
  image?: string;
};
