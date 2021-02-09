import { ICuradoriaDTO } from './CuradoriaDTO';
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

  async execute(
    data: ICuradoriaDTO,
    alteredFields: string[]
  ): Promise<ICuradoriaDTO> {
    data.expectedOutput = await this.imageHelper.insertImagesOnDatabaseConvertBase64ToImageLink(
      data.expectedOutput
    );
    await this.assistantService.updateNode(
      data.expectedNode,
      data.expectedOutput
    );

    if (alteredFields.includes('examples')) {
      data.succeed = false;
    }

    const oldData = await this.curadoriaRepository.findById(data._id);
    const updatedObject = await this.curadoriaRepository.update(data);

    this.mailHelper.sendCuradoriaItemUpdatedMail({
      oldData,
      newData: updatedObject,
      alteredFields,
    });

    return updatedObject;
  }
}
