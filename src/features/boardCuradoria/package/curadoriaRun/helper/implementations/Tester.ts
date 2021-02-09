import { IrunTest, ITestResult } from '../ITester';
import { ICuradoriaContext } from '../../CuradoriaDTO';
import { AssistantService } from '../../services/implementations/AssistantService';

export class Tester implements IrunTest {
  constructor(private assistant: AssistantService) {}

  async execute(text: string): Promise<ITestResult> {
    const response = await this.assistant.processInputText(
      text,
      {} as ICuradoriaContext,
      false,
      'ALES'
    );

    if (response.error) throw new Error(response.error.message);

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

    return {
      nodeId: this.getLastNode(response.context),
      output: response?.output?.text,
    };
  }

  private getLastNode(context?: ICuradoriaContext) {
    return Object.keys(context?._node_output_map ?? {}).pop() ?? 'ERROR';
  }
}
