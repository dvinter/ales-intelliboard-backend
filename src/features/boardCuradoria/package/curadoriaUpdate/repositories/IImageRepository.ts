import IRepository from '@/common/interfaces/IRepository';
import { IImageDTO, IImageModel } from '../CuradoriaDTO';

export interface IImageRepository extends IRepository<IImageModel> {
  create(data: Buffer, contentType: string): Promise<IImageDTO>;
}
