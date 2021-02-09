import { ICuradoriaDTO, ICuradoriaModel } from '../../CuradoriaDTO';
import { ICuradoriaRepository } from '../ICuradoriaRepository';

export class CuradoriaRepository implements ICuradoriaRepository {
  constructor(private curadoriaModel: ICuradoriaModel) {}

  getAllNodes(): Promise<ICuradoriaDTO[]> {
    return this.curadoriaModel.find({});
  }

  async getNode(nodeId: string): Promise<ICuradoriaDTO> {
    return this.curadoriaModel.findById(nodeId);
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
}
