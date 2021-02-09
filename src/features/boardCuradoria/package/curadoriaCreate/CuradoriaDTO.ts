import { Document, Model } from 'mongoose';

interface ICuradoriaMessage {
  _id: string;
  text: string;
}

export interface ICuradoriaInput {
  subject: string;
  expectedOutput: string;
  expectedNode?: string;
  responsible?: string;
  flag?: boolean;
  examples?: ICuradoriaMessage[];
}

export interface ICuradoriaDTO extends Document, ICuradoriaInput {
  _id: string;
}

export interface IImageDTO extends Document {
  data: Buffer;
  contentType: string;
}

export type ICuradoriaModel = Model<ICuradoriaDTO>;

export type IImageModel = Model<IImageDTO>;

export interface ICuradoriaEntity {
  entity: string;
  value: string;
  confidence: number;
}

export interface ICuradoriaIntent {
  intent: string;
  confidence: number;
}
