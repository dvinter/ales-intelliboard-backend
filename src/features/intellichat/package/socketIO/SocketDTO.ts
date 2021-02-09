import { Document, Model } from 'mongoose';
import { IChatMessage } from './helper/Chat';

export interface ISocketAtendimento extends Document {
  messages: string[];
  sector: string;
  user: unknown;
}
interface Messages {
  _id: string;
  MessageSid?: string;
  text: string;
  date: Date;
  from: string;
}
interface AtendimentoUser {
  userNumber: string;
  userName: string;
}
export interface ISocketAtendimentoDTO extends Document {
  _id: string;
  messages?: [Messages];
  user?: AtendimentoUser;
  platform?: string;
}

export interface IntelliChatUser extends Document {
  room: string[];
  _id: string;
}

export interface ISocketMessage {
  atendimentoId: string;
  room: string;
  name: string;
  userNumber: string;
  message: IChatMessage;
  origin: string;
  platform: string;
  MessageSid?: string;
}

export type IIntelliChatUserModel = Model<IntelliChatUser>;

export type IAtendimentoModel = Model<ISocketAtendimento>;
