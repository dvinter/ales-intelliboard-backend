import { IAssitantProvider } from '@/common/providers/assistantV1/IAssistant';
import { IAssistantService } from '../IAssistantService';

export class AssistantService implements IAssistantService {
  constructor(private assistantProvider: IAssitantProvider) {}

  async createNode(output: string): Promise<string> {
    const response = await this.assistantProvider.createNode(output);
    return response?.result?.dialog_node;
  }
}
