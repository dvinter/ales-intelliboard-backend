import IRepository from '@/common/interfaces/IRepository';
import { ICuradoriaDTO, ICuradoriaModel } from '../CuradoriaDTO';

export interface ICuradoriaRepository extends IRepository<ICuradoriaModel> {
  getAllNodes(): Promise<ICuradoriaDTO[]>;
  getNode(nodeId: string): Promise<ICuradoriaDTO>;
  save(item: ICuradoriaDTO, modifiedFields?: string[]): Promise<ICuradoriaDTO>;
}
