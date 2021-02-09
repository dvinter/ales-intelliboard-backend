import { CuradoriaRepository } from './repositories/implementations/CuradoriaRepository';
import { ImageRepository } from './repositories/implementations/ImageRepository';
import { CuradoriaUseCase } from './CuradoriaUseCase';
import { MessageController } from './CuradoriaController';
import curadoria from '@/common/entities/Curadoria';
import imageModel from '@/common/entities/Image';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import { IbmWatsonAssistant } from '@/common/providers/assistantV1/implementations/IbmWatsonAssistant';
import { AssistantHelper } from './services/implementations/AssistantService';
import { MailHelper } from './helper/implementations/MailHelper';
import { ImageHelper } from './helper/implementations/ImageHelper';
import { MailService } from './services/implementations/MailService';
import { MailProvider } from '@/common/providers/mail/implements/Mail';

const {
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASS,
  HMG_WORKSPACE_ID,
  PROJECT_URL,
} = process.env;

const curadoriaRepository = new CuradoriaRepository(curadoria);

const imageRepository = new ImageRepository(imageModel);

const assistantProvider = new IbmWatsonAssistant(HMG_WORKSPACE_ID ?? '');

const assistantService = new AssistantHelper(assistantProvider);

const mailProvider = new MailProvider(
  EMAIL_HOST ?? '',
  Number(EMAIL_PORT) ?? 0,
  EMAIL_USER ?? '',
  EMAIL_PASS ?? ''
);

const mailService = new MailService(mailProvider);

const mailHelper = new MailHelper(mailService);

const imageHelper = new ImageHelper(imageRepository, PROJECT_URL ?? '');

const curadoriaUseCase = new CuradoriaUseCase(
  curadoriaRepository,
  assistantService,
  mailHelper,
  imageHelper
);

const responseResolverAdapter = new ResponseResolverAdapter();

const curadoriaController = new MessageController(
  curadoriaUseCase,
  responseResolverAdapter
);

export { curadoriaUseCase, curadoriaController };
