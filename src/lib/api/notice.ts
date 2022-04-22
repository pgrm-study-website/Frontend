import client from './client';

export const create = (payload: number) => client.post('notices', payload);
export const read = () => client.get(`notifications`);
export const readOne = (payload: number) => client.get(`notices/${payload}`);
export const removeAll = () => client.delete(`notices`);
export const removeOne = (payload: number) =>
  client.delete(`notices/${payload}`);

export type notificationProps = {
  id: number;
  user_id: number;
  content: string;
  url: string;
  notification_type:
    | 'apply'
    | 'accept'
    | 'reject'
    | 'comment'
    | 'recomment'
    | 'message';
  is_read: boolean;
  create_date?: Date;
  update_date?: Date;
  image?: string;
};
