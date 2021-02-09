import { IAssitantProvider } from '@/common/providers/assistantV1/IAssistant';
import { IAssistantService } from '../IAssistantService';

export class AssistantHelper implements IAssistantService {
  constructor(private assistantProvider: IAssitantProvider) {}

  async updateNode(nodeId: string, output: string): Promise<void> {
    await this.assistantProvider.updateNode(nodeId, output);
  }
}
