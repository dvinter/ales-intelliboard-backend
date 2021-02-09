import { Document } from 'mongoose';
export interface IUserDTO extends Document {
  _id: string;
  email: string;
  isSupervisor: boolean;
  readOnly: boolean;
  password: string;
}