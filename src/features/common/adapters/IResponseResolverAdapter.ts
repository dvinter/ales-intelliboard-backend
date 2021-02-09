import { IResponse } from '../interfaces/IResponse';

export interface IResponseResolverAdapter {
  successResponse(body: unknown): IResponse;
  badRequestResponse(body: unknown): IResponse;
  internalServerErrorResponse(body: unknown): IResponse;
  notFoundResponse(body: unknown): IResponse;
  noContentResponse(): IResponse;
  contentTypeResponse(body: Buffer, contentType: string): IResponse;
}

export default IResponseResolverAdapter;
