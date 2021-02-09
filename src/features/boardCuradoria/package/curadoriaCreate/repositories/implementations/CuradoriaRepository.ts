import {
  ICuradoriaDTO,
  ICuradoriaInput,
  ICuradoriaModel,
} from '../../CuradoriaDTO';
import { ICuradoriaRepository } from '../ICuradoriaRepository';

export class CuradoriaRepository implements ICuradoriaRepository {
  constructor(private curadoriaModel: ICuradoriaModel) {}

  create(data: ICuradoriaInput): Promise<ICuradoriaDTO> {
    return this.curadoriaModel.create(data);
  }
}
