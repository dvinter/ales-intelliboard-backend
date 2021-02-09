import { IAssitantProvider } from '@/common/providers/assistant/IAssistant';
import { ICircularId } from '@/common/providers/circularId/ICircularId';
import btoa from 'btoa';
import { Icontext } from '../../MessageDTO';
import {
  AssistantResponse,
  IAssistantService,
  UserInput,
} from '../IAssistantService';
export class AssistantService implements IAssistantService {
  constructor(
    private assistantProvider: IAssitantProvider,
    private circularIdProvider: ICircularId
  ) {}
  async processInputText(
    input: UserInput,
    context?: Icontext,
    circularId?: boolean,
    projectName = 'starter'
  ): Promise<AssistantResponse> {
    if (!context) {
      context = {} as Icontext;
    }
    if (!context.session_id && circularId === true) {
      context.session_id = await this.circularIdProvider.getId(projectName);
    }
    const skillContext = {
      global: { session_id: context.session_id },
      skills: {
        'main skill': {
          system: { state: btoa(JSON.stringify(context)) },
        },
      },
    };
    const response = await this.assistantProvider.sendMessage(
      input.text,
      skillContext
    );
    return {
      context: response.context,
      output: response.output,
    };
  }
}
