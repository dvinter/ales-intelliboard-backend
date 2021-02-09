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
  MessageSid?: string;
  text: string;
  date: Date;
  from: string;
  status: string;
  context: Record<string, unknown>;
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
  messages?: [Messages];
  user?: AtendimentoUser;
  rating?: Rating;
  observations?: string;
  reviewed?: boolean;
  rooms?: [string];
  platform?: string;
  createdAt?: Date;
  updatedAt?: Date;
  endedAt?: Date;
}

export interface Icontext {
  [propName: string]: unknown;
  session_id: string;
  skill_reference: string;
  assistant_id: string;
  action?: string;
  digressionFailedCount?: number;
  resendToWatson?: boolean;
}
