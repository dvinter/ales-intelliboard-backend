import { IAssitantProvider } from '@/common/providers/assistantV1/IAssistant';
import { IAssistantService } from '../IAssistantService';

export class AssistantService implements IAssistantService {
  constructor(private assistantProvider: IAssitantProvider) {}

  async disableNode(nodeId: string): Promise<void> {
    await this.assistantProvider.disableNode(nodeId);
  }
}
