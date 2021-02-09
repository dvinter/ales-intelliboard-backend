import { Document, Model } from 'mongoose';

interface ICuradoriaMessage {
  _id: string;
  text: string;
  succeed?: boolean;
  obtainedOutput?: string;
  obtainedNode?: string;
  obtainedIntents?: ICuradoriaIntent[];
  obtainedEntities?: ICuradoriaEntity[];
}

interface ICuradoriaInput {
  subject: string;
  expectedOutput: string;
  expectedNode: string;
  responsible?: string;
  flag?: boolean;
  succeed?: boolean;
  examples: ICuradoriaMessage[];
}

export interface ICuradoriaDTO extends Document, ICuradoriaInput {
  _id: string;
}

export type ICuradoriaModel = Model<ICuradoriaDTO>;

export interface ICuradoriaEntity {
  entity: string;
  value: string;
  confidence: number;
}

export interface ICuradoriaIntent {
  intent: string;
  confidence: number;
}
