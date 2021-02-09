import { Icontext } from '@/landingPage/package/messages/MessageDTO';
import { Schema, Document } from 'mongoose';

enum Status {
  'Ofertado',
  'Entregue',
  'Visualizado',
  'Perdido',
  'Feedback',
  'Interessado',
  'Contactar Urgente',
  'Agendando',
  'Aguardando Contato',
  'Lead Curador',
  'Transferido Humano',
  'Nao Entregue',
}

enum Rating {
  'GOOD',
  'BAD',
}

interface UserContext {
  key: string;
  value: Schema.Types.Mixed;
}

interface Messages {
  _id: string;
  MessageSid: string;
  text: string;
  date: Date;
  from: string;
  status: string;
  context: string;
  misunderstood?: boolean;
}

interface AtendimentoUser {
  userNumber: string;
  userName: string;
}

export interface IAtendimentoDTO extends Document {
  _id: string;
  project?: string;
  sector?: string;
  status?: Status;
  campaignUserContext?: UserContext;
  messages?: Messages[];
  user?: AtendimentoUser;
  rating?: Rating;
  observations?: string;
  reviewed?: boolean;
  rooms?: [string];
  platform?: string;
  createdAt?: Date;
  updatedAt?: Date;
  endedAt?: Date;
  [propName: string]: unknown;
}
