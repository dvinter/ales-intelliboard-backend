import { Document, Model } from 'mongoose';

export interface IUserDTO extends Document {
  _id: string;
}

export type IUserModel = Model<IUserDTO>;
