import { IrunTest, ITestResult } from '../ITester';
import {
  ICuradoriaAssistantResponse,
  ICuradoriaContext,
} from '../../CuradoriaDTO';
import { AssistantService } from '../../services/implementations/AssistantService';

export class Tester implements IrunTest {
  constructor(private assistant: AssistantService) {}

  async execute(
    id: string,
    input: string,
    expectedNode: string
  ): Promise<ITestResult> {
    const response = await this.assistant.processInputText(
      input,
      {} as ICuradoriaContext,
      false,
      'ALES'
    );

    if (response.error) throw new Error(response.error.message);

    return this.parseResponse(id, response, expectedNode);
  }

  private parseResponse(
    id: string,
    response: ICuradoriaAssistantResponse,
    expectedNode: string
  ) {
    if (
      !response?.context?.finishNode &&
      Number(response?.output?.generic?.length) > 1
    ) {
      //remove último nó, geralmente o nó 'posso ajudar em algo mais'
      response?.output?.generic?.pop();
      delete response?.context?._node_output_map[
        response.context.last_branch_node
      ];
    }

    const obtainedNode = this.getLastNode(response.context);

    return {
      id,
      succeed: expectedNode === obtainedNode,
      obtainedOutput: response?.output?.text ?? '',
      obtainedNode,
      obtainedIntents: response.output?.intents,
      obtainedEntities: response.output?.entities,
    };
  }

  private getLastNode(context?: ICuradoriaContext) {
    return Object.keys(context?._node_output_map ?? {}).pop() ?? 'ERROR';
  }
}
