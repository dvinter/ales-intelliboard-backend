import { CuradoriaRepository } from './repositories/implementations/CuradoriaRepository';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import { MessageController } from './CuradoriaController';
import curadoria from '@/common/entities/Curadoria';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';

const curadoriaRepository = new CuradoriaRepository(curadoria);

const curadoriaUpdateUseCase = new CuradoriaUseCase(curadoriaRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const curadoriaUpdateController = new MessageController(
  curadoriaUpdateUseCase,
  responseResolverAdapter
);

export { curadoriaUpdateUseCase, curadoriaUpdateController };
