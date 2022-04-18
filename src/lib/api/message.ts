import client from './client';

export const read = (user_id: number) => client.get(`messages/${user_id}`);
export const readDetail = (user_id: number, other_id: number) =>
  client.get(`messages?me=${user_id}&other=${other_id}`);
export const removeAll = (user_id: number) =>
  client.delete(`/messages/{messageId}?userId=${user_id}`);
export const removeOne = (messag_id: number, user_id: number) =>
  client.delete(` /messages/${messag_id}?userId=${user_id}`);
export const send = (payload: sendMessageProps) =>
  client.post('/messages', payload);
export type sendMessageProps = {
  me: number;
  other: number;
  content: string;
};
export type messageProps = {
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
