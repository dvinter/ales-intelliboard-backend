import { AssistantOutput } from '@/common/providers/assistant/IAssistant';
export interface AssistantResponse {
  context?: never;
  output?: AssistantOutput;
}

export interface UserInput {
  text: string;
}

export interface IAssistantService {
  processInputText(
    input: UserInput,
    context?: unknown,
    circularId?: boolean,
    projectName?: string
  ): Promise<AssistantResponse>;
}
