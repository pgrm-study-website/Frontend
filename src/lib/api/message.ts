import { StringLiteralLike } from 'typescript';
import client from './client';

export const read = (payload: readMessages) =>
  client.get(`messages/user/${payload.id}`);
export const readDetail = (user_id: number, other_id: number) =>
  client.get(`messages?me=${user_id}&other=${other_id}`);
export const removeAll = (user_id: number) =>
  client.delete(`/messages/{messageId}?userId=${user_id}`);
export const removeOne = (messag_id: number, user_id: number) =>
  client.delete(` /messages/${messag_id}?userId=${user_id}`);
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
