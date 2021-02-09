import IRepository from '@/common/interfaces/IRepository';
import { ICuradoriaDTO, ICuradoriaModel } from '../CuradoriaDTO';

export interface ICuradoriaRepository extends IRepository<ICuradoriaModel> {
  update(infos: ICuradoriaDTO): Promise<ICuradoriaDTO>;
  findById(id: string): Promise<ICuradoriaDTO>;
}
