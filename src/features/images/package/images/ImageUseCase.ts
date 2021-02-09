import { IImageDTO } from './ImageDTO';
import { IImageRepository } from './repositories/IImageRepository';

export class ImageUseCase {
  constructor(private imageRepository: IImageRepository) {}
  async execute(id: string): Promise<IImageDTO> {
    return this.imageRepository.findById(id);
  }
}
