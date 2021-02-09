import IRepository from '@/common/interfaces/IRepository';
import {
  ICuradoriaDTO,
  ICuradoriaInput,
  ICuradoriaModel,
} from '../CuradoriaDTO';

export interface ICuradoriaRepository extends IRepository<ICuradoriaModel> {
  create(infos: ICuradoriaInput): Promise<ICuradoriaDTO>;
}
