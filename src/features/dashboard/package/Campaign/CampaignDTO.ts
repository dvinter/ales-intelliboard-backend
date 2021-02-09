import { Document } from 'mongoose';

export interface ICampaignDTO extends Document {
  _id: string;
  createdAt: string;
}

