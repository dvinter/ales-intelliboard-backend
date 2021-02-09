import { MessagesRepository } from './repositories/implementations/MessagesRepository';
import { MessagesUseCase } from '../Messages/MessagesUseCase';
import { MessageController } from '../Messages/MessagesController';
import atendimento from '@/common/entities/Atendimento';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';

const messagesRepository = new MessagesRepository(atendimento);

const messagesUseCase = new MessagesUseCase(messagesRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const messagesController = new MessageController(
  messagesUseCase,
  responseResolverAdapter
);

export { messagesUseCase, messagesController };
