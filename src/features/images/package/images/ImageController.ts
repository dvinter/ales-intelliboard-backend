import IResponseResolverAdapter from '@/common/adapters/IResponseResolverAdapter';
import IController from '@/common/interfaces/IController';
import { IResponse } from '@/common/interfaces/IResponse';
import { NextApiRequest } from 'next';
import { IImageDTO } from './ImageDTO';
import { ImageUseCase } from './ImageUseCase';

export class ImageController implements IController {
  constructor(
    private ImageUseCase: ImageUseCase,
    private response: IResponseResolverAdapter
  ) {}

  async execute(req: NextApiRequest): Promise<IResponse> {
    const { id } = req.query;
    try {
      if (!id) return this.response.badRequestResponse('Missing id Param');

      const image: IImageDTO = await this.ImageUseCase.execute(id.toString());

      return this.response.contentTypeResponse(image.data, image.contentType);
    } catch (error) {
      return this.response.internalServerErrorResponse({
        message: error.message ?? 'Unexpected Server error',
      });
    }
  }
}
