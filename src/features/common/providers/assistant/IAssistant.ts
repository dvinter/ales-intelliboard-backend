export interface AssistantOutput {
  generic?: {
    response_type: string;
    text?: string;
  }[];
  text?: string;
}

interface IErrorMessage {
  message: string;
  path: string;
}

interface IAssistantError {
  statusText: string;
  name: string;
  status: number;
  code: number;
  message: string;
  body: {
    error: string;
    errors: [IErrorMessage];
  };
  headers: {
    key: string;
    value: string;
  }[];
}

export interface IAssistantResponse {
  output?: AssistantOutput;
  error?: IAssistantError;
  context?: never;
}
export interface IAssitantProvider {
  sendMessage(text: string, context?: unknown): Promise<IAssistantResponse>;
}
