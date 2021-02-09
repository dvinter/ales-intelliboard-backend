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

export interface ICuradoriaContext {
  _node_output_map: Record<string, unknown>;
  last_branch_node: string;
  [propName: string]: unknown;
}

export interface ICuradoriaAssistantOutput {
  generic?: {
    response_type: string;
    text?: string;
  }[];
  text?: string;
  entities?: ICuradoriaEntity[];
  intents?: ICuradoriaIntent[];
}
export interface ICuradoriaAssistantResponse {
  output?: ICuradoriaAssistantOutput;
  error?: ICuradoriaAssistantError;
  context?: ICuradoriaContext;
}

interface ICuradoriaAssistantError {
  statusText: string;
  name: string;
  status: number;
  code: number;
  message: string;
  body: {
    error: string;
    errors: { message: string; path: string }[];
  };
  headers: {
    key: string;
    value: string;
  }[];
}

export interface ICuradoriaEntity {
  entity: string;
  value: string;
  confidence: number;
}

export interface ICuradoriaIntent {
  intent: string;
  confidence: number;
}
