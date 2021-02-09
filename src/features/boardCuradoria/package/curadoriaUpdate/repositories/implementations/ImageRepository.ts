import { IImageDTO, IImageModel } from '../../CuradoriaDTO';
import { IImageRepository } from '../IImageRepository';

export class ImageRepository implements IImageRepository {
  constructor(private imageModel: IImageModel) {}
  create(data: Buffer, contentType: string): Promise<IImageDTO> {
    return this.imageModel.create({ data, contentType });
  }
}
