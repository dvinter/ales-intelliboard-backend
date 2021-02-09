import { ICuradoriaDTO, ICuradoriaModel } from '../../CuradoriaDTO';
import { ICuradoriaRepository } from '../ICuradoriaRepository';

export class CuradoriaRepository implements ICuradoriaRepository {
  constructor(private curadoriaModel: ICuradoriaModel) {}

  update(infos: ICuradoriaDTO): Promise<ICuradoriaDTO> {
    return this.curadoriaModel.findByIdAndUpdate(infos._id, infos, {
      new: true,
      upsert: true,
    });
  }

  findById(id: string): Promise<ICuradoriaDTO> {
    return this.curadoriaModel.findById(id);
  }
}
