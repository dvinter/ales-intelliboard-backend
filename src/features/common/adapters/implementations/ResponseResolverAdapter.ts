import { IResponse } from '@/common/interfaces/IResponse';
import IResponseResolverAdapter from '../IResponseResolverAdapter';

export class ResponseResolverAdapter implements IResponseResolverAdapter {
  notFoundResponse(body: unknown): IResponse {
    return {
      statusCode: 404,
      body,
    };
  }
  noContentResponse(): IResponse {
    return {
      statusCode: 204,
    };
  }
  successResponse(body: unknown): IResponse {
    return {
      statusCode: 200,
      body,
    };
  }
  badRequestResponse(body: unknown): IResponse {
    return {
      statusCode: 400,
      body,
    };
  }
  internalServerErrorResponse(body: unknown): IResponse {
    return {
      statusCode: 500,
      body,
    };
  }
  contentTypeResponse(body: Buffer, contentType: string): IResponse {
    return {
      body,
      contentType,
      statusCode: 200,
    };
  }
}

export default ResponseResolverAdapter;
