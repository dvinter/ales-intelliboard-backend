import { CuradoriaRepository } from './repositories/implementations/CuradoriaRepository';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import { MessageController } from './CuradoriaController';
import curadoria from '@/common/entities/Curadoria';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import { IbmWatsonAssistant } from '@/common/providers/assistant/implementations/IbmWatsonAssistant';
import { Tester } from './helper/implementations/Tester';
import { AssistantService } from './services/implementations/AssistantService';
import { CircularId } from '@/common/providers/circularId/implementations/CircularId';

const curadoriaRepository = new CuradoriaRepository(curadoria);

const assistantProvider = new IbmWatsonAssistant(
  process.env.HMG_ASSISTANT_ID ?? ''
);
const circularIdProvider = new CircularId();
const assistantService = new AssistantService(
  assistantProvider,
  circularIdProvider
);

const tester = new Tester(assistantService);

const curadoriaRunUseCase = new CuradoriaUseCase(curadoriaRepository, tester);

const responseResolverAdapter = new ResponseResolverAdapter();

const curadoriaRunController = new MessageController(
  curadoriaRunUseCase,
  responseResolverAdapter
);

export { curadoriaRunUseCase, curadoriaRunController };
