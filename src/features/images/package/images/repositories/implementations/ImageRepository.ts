import { IImageDTO } from '../../ImageDTO';
import { Model } from 'mongoose';
import { IImageRepository } from '../IImageRepository';

export class ImageRepository implements IImageRepository {
  constructor(private imageModel: Model<IImageDTO>) {}
  findById(id: string): Promise<IImageDTO> {
    return this.imageModel.findById(id);
  }
}
