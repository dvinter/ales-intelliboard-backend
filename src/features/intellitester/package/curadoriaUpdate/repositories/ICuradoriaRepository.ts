import IRepository from '@/common/interfaces/IRepository';
import { ICuradoriaDTO, ICuradoriaModel } from '../CuradoriaDTO';

export interface ICuradoriaRepository extends IRepository<ICuradoriaModel> {
  updateExpectedNode(id: string, expectedNode: string): Promise<ICuradoriaDTO>;
}
