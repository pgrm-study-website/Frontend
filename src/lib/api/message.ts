import client from './client';

export const read = (payload: readMessages) =>
  client.get(`messages/user/${payload.id}`);
export const readDetail = (payload: string) =>
  client.get(`messages?${payload}`);
export const removeAll = (payload: string) =>
  client.delete(`/messages/all?${payload}`);
export const removeOne = (payload: { messag_id: number; user_id: number }) =>
  client.delete(` /messages/${payload.messag_id}?userId=${payload.user_id}`);
export const send = (payload: sendMessageProps) =>
  client.post('/messages', payload);

export type readMessages = {
  id: number;
};
export type sendMessageProps = {
  userId: string;
  otherId: string;
  content: string;
};
export type messagesProps = {
  otherPersonId: number;
  otherPersonNickname: string;
  content: string;
  createDate: Date;
};
export type messagesDetailProps = {
  messageId: number;
  type: 'send' | 'receive';
  content: string;
  createDate: Date;
};
