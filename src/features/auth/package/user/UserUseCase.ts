import { IUserDTO } from './UserDTO';
import { IUserRepository } from './repositories/IUserRepository';
import { IUserHelper } from './helper/IUserHelper';

export class UserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private userHelper: IUserHelper
  ) {}

  async createUser(email: string, password: string): Promise<IUserDTO | null> {
    if (await this.userRepository.findByEmail(email)) {
      return null;
    }
    const hashedPassword = await this.userHelper.hashGenerator(password);
    return this.userRepository.createUser(email, hashedPassword);
  }
}
