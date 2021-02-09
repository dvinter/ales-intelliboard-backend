import { IAssistantService } from './services/IAssistantService';
import { ICuradoriaRepository } from './repositories/ICuradoriaRepository';
import { IMailHelper } from './helper/IMailHelper';
export class CuradoriaUseCase {
  constructor(
    private curadoriaRepository: ICuradoriaRepository,
    private assistantService: IAssistantService,
    private mailHelper: IMailHelper
  ) {}
  async execute(nodeId: string, exampleId?: string): Promise<void> {
    if (exampleId) {
      return this.curadoriaRepository.deleteExample(nodeId, exampleId);
    }
    const node = await this.curadoriaRepository.findById(nodeId);
    await this.assistantService.disableNode(node.expectedNode);

    this.mailHelper.sendCuradoriaItemDeletedMail({ oldData: node });

    await this.curadoriaRepository.deleteNode(nodeId);
  }
}
