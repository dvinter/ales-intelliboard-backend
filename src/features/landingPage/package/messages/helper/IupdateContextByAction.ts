import { Icontext } from '../../messages/MessageDTO';

export interface IUpdateContextByAction {
  updateContext(context: Icontext): Promise<Icontext>;
  joinChat(context: Icontext): Promise<Icontext>;
}
