import { UserRepository } from './repositories/implementations/UserRepository';
import { UserHelper } from './helper/implementations/UserHelper';
import { UserUseCase } from './UserUseCase';
import { MessageController } from './UserController';
import user from '@/common/entities/User';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';

const userRepository = new UserRepository(user);

const userHelper = new UserHelper();

const userUseCase = new UserUseCase(userRepository, userHelper);

const responseResolverAdapter = new ResponseResolverAdapter();

const userController = new MessageController(
  userUseCase,
  responseResolverAdapter
);

export { userUseCase, userController };
