import { ICuradoriaModel, ICuradoriaDTO } from '../../CuradoriaDTO';
import { ICuradoriaRepository } from '../ICuradoriaRepository';

export class CuradoriaRepository implements ICuradoriaRepository {
  constructor(private curadoriaModel: ICuradoriaModel) {}
  async deleteExample(nodeId: string, exampleId: string): Promise<void> {
    const content: ICuradoriaDTO = await this.curadoriaModel.findById(nodeId);

    const index = content.examples.findIndex((e) => e._id == exampleId);
    content.examples.splice(index, 1);

    content.markModified('examples');
    await content.save();
  }

  async deleteNode(nodeId: string): Promise<void> {
    await this.curadoriaModel.findByIdAndDelete(nodeId);
  }

  save(
    item: ICuradoriaDTO,
    modifiedFields: string[] = []
  ): Promise<ICuradoriaDTO> {
    for (const field of modifiedFields) {
      item.markModified(field);
    }
    return item.save();
  }

  findById(nodeId: string): Promise<ICuradoriaDTO> {
    return this.curadoriaModel.findById(nodeId);
  }
}
