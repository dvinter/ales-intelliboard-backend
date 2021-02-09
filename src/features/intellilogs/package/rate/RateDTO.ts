import { Document } from 'mongoose';
export enum IrateStates {
  good = 'GOOD',
  bad = 'BAD',
}
export interface RateDTO extends Document {
  _id: string;
  rating?: IrateStates;
  observations?: string;
}
