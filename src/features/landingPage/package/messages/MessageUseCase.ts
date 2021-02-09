import {
  AssistantResponse,
  IAssistantService,
  UserInput,
} from './services/IAssistantService';
import { generateInitialMessage } from './helper/generateInitialMessage';
import { IMessagesRepository } from './repositories/IMessagesRepository';
import { Icontext } from './MessageDTO';
import { AssistantOutput } from '@/common/providers/assistant/IAssistant';
import { IUpdateContextByAction } from './helper/IupdateContextByAction';
export class MessageUseCase {
  constructor(
    private messageService: IAssistantService,
    private messageRepository: IMessagesRepository,
    private updateContextByAction: IUpdateContextByAction,
    private projectName: string = 'LandingPage',
    private userTag: string = 'User',
    private assistantTag: string = 'Assistente',
    private INITIAL_MESSAGE = 'Olá, sou a steela.\nEm que posso lhe ajudar?'
  ) {}
  async execute(
    input: UserInput,
    context?: Icontext,
    initialMessage?: boolean
  ): Promise<{
    output?: AssistantOutput;
    context: Icontext | Record<string, unknown>;
  }> {
    let updatedOutput: AssistantOutput | undefined;
    let outputContext: Icontext;
    const circularId = !!process.env.CIRCULAR_ID;
    if (initialMessage)
      return new generateInitialMessage().generateInitialMessage(
        this.INITIAL_MESSAGE
      );
    const {
      context: responseContext,
      output,
    }: {
      context?: Icontext;
      output?: AssistantOutput;
    } = await this.messageService.processInputText(input, context, circularId);
    if (!responseContext) throw 'Missing context';
    const { session_id } = responseContext;
    const updatedContext = await this.updateContextByAction.updateContext(
      responseContext
    );

    if (updatedContext.resendToWatson === true) {
      delete updatedContext.resendToWatson;
      const lastResponse: AssistantResponse = await this.messageService.processInputText(
        { text: '' },
        updatedContext,
        circularId
      );
      outputContext = await this.updateContextByAction.updateContext(
        lastResponse.context ?? ({} as Icontext)
      );
      updatedOutput = lastResponse.output;
    } else {
      updatedOutput = output;
      outputContext = updatedContext;
    }

    try {
      if (context) {
        await this.messageRepository.saveMessage(
          session_id,
          input.text,
          context,
          this.userTag,
          this.projectName
        );
      }
      await this.messageRepository.saveMessage(
        session_id,
        updatedOutput?.text ?? '',
        outputContext,
        this.assistantTag,
        this.projectName
      );
    } catch (e) {
      console.error(e);
    }
    return {
      output: updatedOutput,
      context: outputContext,
    };
  }
}
