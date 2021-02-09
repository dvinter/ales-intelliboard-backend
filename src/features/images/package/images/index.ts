import { ImageRepository } from './repositories/implementations/ImageRepository';
import { ImageUseCase } from './ImageUseCase';
import { ImageController } from './ImageController';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import imageModel from '@/common/entities/Image';

const imageRepository = new ImageRepository(imageModel);

const imageUseCase = new ImageUseCase(imageRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const imageController = new ImageController(
  imageUseCase,
  responseResolverAdapter
);

export { imageUseCase, imageController };
