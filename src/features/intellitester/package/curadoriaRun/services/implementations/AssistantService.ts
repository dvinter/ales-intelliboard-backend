import { IAssitantProvider } from '@/common/providers/assistant/IAssistant';
import { ICircularId } from '@/common/providers/circularId/ICircularId';
import btoa from 'btoa';
import {
  ICuradoriaContext,
  ICuradoriaAssistantResponse,
} from '../../CuradoriaDTO';
import { IAssistantService } from '../IAssistantService';
export class AssistantService implements IAssistantService {
  constructor(
    private assistantProvider: IAssitantProvider,
    private circularIdProvider: ICircularId
  ) {}
  async processInputText(
    input: string,
    context = {} as ICuradoriaContext,
    useCircularId = true,
    projectName = 'starter'
  ): Promise<ICuradoriaAssistantResponse> {
    if (!context.session_id && useCircularId === true) {
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
      input,
      skillContext
    );
    console.log(response)

    return {
      context: response.context,
      output: response.output,
    };
  }
}
