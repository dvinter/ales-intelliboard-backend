import IRepository from '@/common/interfaces/IRepository';
import { ICuradoriaDTO, ICuradoriaModel } from '../CuradoriaDTO';

export interface ICuradoriaRepository extends IRepository<ICuradoriaModel> {
  getAll(): Promise<ICuradoriaDTO[]>;

  findById(id: string): Promise<ICuradoriaDTO | null>;
}
