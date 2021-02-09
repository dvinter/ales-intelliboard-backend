import IRepository from '@/common/interfaces/IRepository';
import { IIntelliChatUserModel, IntelliChatUser } from '../SocketDTO';

export interface IUserRepository extends IRepository<IIntelliChatUserModel> {
  findByRoom(room: string): Promise<IntelliChatUser>;
}
