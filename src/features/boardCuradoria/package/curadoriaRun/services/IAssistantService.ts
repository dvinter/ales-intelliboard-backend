import { AssistantOutput } from '@/common/providers/assistant/IAssistant';
import { ICuradoriaAssistantResponse } from '../CuradoriaDTO';
export interface AssistantResponse {
  context?: never;
  output?: AssistantOutput;
}

export interface IAssistantService {
  processInputText(
    input: string,
    context?: unknown,
    circularId?: boolean,
    projectName?: string
  ): Promise<ICuradoriaAssistantResponse>;
}
