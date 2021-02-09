import { Icontext } from '../../MessageDTO';
import { IUpdateContextByAction } from '../IupdateContextByAction';

export class UpdateContextByAction implements IUpdateContextByAction {
  private ACTIONS = {
    CALLDIGRESSIONS: 'callDigressions',
    JOINCHAT: 'joinChat',
    CREATECHAT: 'createChat',
    SETACTION: 'setAction',
  };
  async joinChat(context: Icontext): Promise<Icontext> {
    return {
      ...context,
      isBotOn: false,
      action: this.ACTIONS.JOINCHAT,
    };
  }
  private checkAction(context: Icontext): Promise<Icontext> {
    switch (context.action) {
      case this.ACTIONS.JOINCHAT:
        return this.joinChat(context);
      default:
        return Promise.resolve(context);
    }
  }
  async updateContext(context: Icontext): Promise<Icontext> {
    if (!context.action) {
      return context;
    }
    return this.checkAction(context);
  }
}
