import { ICuradoriaDTO, ICuradoriaModel } from '../../CuradoriaDTO';
import { ICuradoriaRepository } from '../ICuradoriaRepository';

export class CuradoriaRepository implements ICuradoriaRepository {
  constructor(private curadoriaModel: ICuradoriaModel) {}
  updateExpectedNode(id: string, expectedNode: string): Promise<ICuradoriaDTO> {
    return this.curadoriaModel.findByIdAndUpdate(
      id,
      { expectedNode },
      {
        new: true,
        upsert: true,
      }
    );
  }
}
