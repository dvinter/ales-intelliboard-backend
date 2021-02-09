import { AuthController } from './AuthController';
import { AuthUseCase } from './AuthUseCase';
import { JWTMiddleware } from './middleware/implementations/JwtMiddleware';
import { EncrypterHelper } from './util/EncrypterHelper';
import { TokenGeneratorHelper } from './util/TokenGeneratorHelper';
import { LoginRepository } from './repository/implementations/AuthRepository';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';

import userModel from '@/common/entities/User';

const tokenGenerator = new TokenGeneratorHelper(process.env.JWT_KEY);

const loginRepository = new LoginRepository(userModel);

const authUseCase = new AuthUseCase(tokenGenerator, loginRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const authController = new AuthController(authUseCase, responseResolverAdapter);

const encrypter = new EncrypterHelper();

const authMiddleware = new JWTMiddleware(loginRepository, encrypter);

export { authController, authUseCase, authMiddleware, AuthController };
