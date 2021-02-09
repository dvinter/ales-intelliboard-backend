import { Document } from 'mongoose';

interface Messages {
  text: string;
  date: Date;
  misunderstood: boolean;
  context: string;
}

export interface IMessagesDTO extends Document {
  _id: string;
  messages?: [Messages];
}
