import client from './client';

export const create = (payload: number) => client.post('notices', payload);
export const read = () => client.get(`notices`);
export const readOne = (payload: number) => client.get(`notices/${payload}`);
export const removeAll = () => client.delete(`notices`);
export const removeOne = (payload: number) => client.delete(`notices/${payload}`);

export type notificationDataProps = {
  id: number;
  date: Date;
  content: string;
  noticeId: number;
  category?: 'announcement' | 'messages' | undefined;
  image?: string;
};
