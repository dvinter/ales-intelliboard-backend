import IRepository from '@/common/interfaces/IRepository';
import { ICuradoriaModel, ICuradoriaDTO } from '../CuradoriaDTO';

export interface ICuradoriaRepository extends IRepository<ICuradoriaModel> {
  deleteNode(nodeId: string): Promise<void>;
  deleteExample(nodeId: string, exampleId: string): Promise<void>;
  save(item: ICuradoriaDTO, modifiedFields?: string[]): Promise<ICuradoriaDTO>;
  findById(nodeId: string): Promise<ICuradoriaDTO>;
}
