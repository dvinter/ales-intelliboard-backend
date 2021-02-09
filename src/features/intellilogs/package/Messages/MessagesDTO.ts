import { Document } from 'mongoose';

interface Messages {
  _id: string;
  MessageSid: string;
  text: string;
  date: Date;
  from: string;
  status: string;
  context: string;
}

export interface IMessagesDTO extends Document {
  _id: string;
  messages?: Messages[];
}
