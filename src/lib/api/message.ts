import { StringLiteralLike } from 'typescript';
import client from './client';

export const read = (payload: readMessages) =>
  client.get(`messages/user/${payload.id}`);
export const readDetail = (payload: string) =>
  client.get(`messages?${payload}`);
export const removeAll = (payload: { user_id: number }) =>
  client.delete(`/messages/{messageId}?userId=${payload.user_id}`);
export const removeOne = (payload: { messag_id: number; user_id: number }) =>
  client.delete(` /messages/${payload.messag_id}?userId=${payload.user_id}`);
export const send = (payload: sendMessageProps) =>
  client.post('/messages', payload);

export type readMessages = {
  id: number;
};
export type sendMessageProps = {
  me: number;
  other: number;
  content: string;
};
export type messagesProps = {
  otherPersonId: number;
  otherPersionNickname: string;
  content: string;
  createDate: Date;
};
export type messagesDetailProps = {
  messageId: number;
  type: 'send' | 'receive';
  content: string;
  createDate: Date;
};
