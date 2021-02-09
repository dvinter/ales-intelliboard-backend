import { Document } from 'mongoose';

export interface IImageDTO extends Document {
  _id: string;
  data: Buffer;
  contentType: string;
}
