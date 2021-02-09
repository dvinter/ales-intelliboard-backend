import { ICuradoriaDTO, ICuradoriaModel } from '../../CuradoriaDTO';
import { ICuradoriaRepository } from '../ICuradoriaRepository';

export class CuradoriaRepository implements ICuradoriaRepository {
  constructor(private curadoriaModel: ICuradoriaModel) {}

  getAll(): Promise<ICuradoriaDTO[]> {
    return this.curadoriaModel.find({});
  }

  findById(id: string): Promise<ICuradoriaDTO | null> {
    return this.curadoriaModel.findById(id).lean();
  }
}
