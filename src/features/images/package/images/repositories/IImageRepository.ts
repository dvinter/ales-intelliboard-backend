import IRepository from '@/common/interfaces/IRepository';
import { Model } from 'mongoose';
import { IImageDTO } from '../ImageDTO';

export interface IImageRepository extends IRepository<Model<IImageDTO>> {
  findById(id: string): Promise<IImageDTO>;
}
