import { ICuradoriaDTO, ICuradoriaInput } from './CuradoriaDTO';
import { IAssistantService } from './services/IAssistantService';
import { ICuradoriaRepository } from './repositories/ICuradoriaRepository';
import { IMailHelper } from './helper/IMailHelper';
import { IImageHelper } from './helper/IImageHelper';
export class CuradoriaUseCase {
  constructor(
    private curadoriaRepository: ICuradoriaRepository,
    private assistantService: IAssistantService,
    private mailHelper: IMailHelper,
    private imageHelper: IImageHelper
  ) {}

  async execute(data: ICuradoriaInput): Promise<ICuradoriaDTO> {
    data.expectedOutput = await this.imageHelper.insertImagesOnDatabaseConvertBase64ToImageLink(
      data.expectedOutput
    );
    if (!data.expectedNode) {
      data.expectedNode = await this.assistantService.createNode(
        data.expectedOutput
      );
    }
    const createdObject = await this.curadoriaRepository.create(data);
    this.mailHelper.sendCuradoriaItemCreatedMail({ newData: createdObject });

    return createdObject;
  }
}
