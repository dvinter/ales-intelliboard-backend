import { IResponse } from './IResponse';

export default interface IController {
  execute(request: unknown): Promise<IResponse>;
}
