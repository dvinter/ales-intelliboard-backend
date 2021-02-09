import { CuradoriaRepository } from './repositories/implementations/CuradoriaRepository';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import { MessageController } from './CuradoriaController';
import curadoria from '@/common/entities/Curadoria';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import { IbmWatsonAssistant } from '@/common/providers/assistantV1/implementations/IbmWatsonAssistant';
import { AssistantService } from './services/implementations/AssistantService';
import { MailHelper } from './helper/implementations/MailHelper';
import { MailService } from './services/implementations/MailService';
import { MailProvider } from '@/common/providers/mail/implements/Mail';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  HMG_WORKSPACE_ID,
} = process.env;

const curadoriaRepository = new CuradoriaRepository(curadoria);

const assistantProvider = new IbmWatsonAssistant(HMG_WORKSPACE_ID ?? '');

const assistantService = new AssistantService(assistantProvider);

const mailProvider = new MailProvider(
  EMAIL_HOST ?? '',
  Number(EMAIL_PORT) ?? 0,
  EMAIL_USER ?? '',
  EMAIL_PASS ?? ''
);

const mailService = new MailService(mailProvider);

const mailHelper = new MailHelper(mailService);

const curadoriaUseCase = new CuradoriaUseCase(
  curadoriaRepository,
  assistantService,
  mailHelper
);

const responseResolverAdapter = new ResponseResolverAdapter();

const curadoriaController = new MessageController(
  curadoriaUseCase,
  responseResolverAdapter
);

export { curadoriaUseCase, curadoriaController };
