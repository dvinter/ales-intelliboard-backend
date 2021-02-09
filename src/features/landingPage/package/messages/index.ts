import { AssistantService } from './services/implementations/AssistantService';
import { MessageUseCase } from './MessageUseCase';
import { MessageController } from './MessageController';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import { IbmWatsonAssistant } from '@providers/assistant/implementations/IbmWatsonAssistant';
import { CircularId } from '@providers/circularId/implementations/CircularId';
import { MessagesRepository } from './repositories/implementations/MessagesRepository';
import atendimentoModel from '@entities/Atendimento';
import { UpdateContextByAction } from './helper/implementations/UpdateContextByAction';

const assistantProvider = new IbmWatsonAssistant(
  process.env.ASSISTANT_ID ?? ''
);

const circularIdProvider = new CircularId();

const assistantService = new AssistantService(
  assistantProvider,
  circularIdProvider
);
const messageRepository = new MessagesRepository(atendimentoModel);

const updateContextByAction = new UpdateContextByAction();

const messageUseCase = new MessageUseCase(
  assistantService,
  messageRepository,
  updateContextByAction
);

const responseResolverAdapter = new ResponseResolverAdapter();

const messageController = new MessageController(
  messageUseCase,
  responseResolverAdapter
);

export { messageUseCase, messageController };
