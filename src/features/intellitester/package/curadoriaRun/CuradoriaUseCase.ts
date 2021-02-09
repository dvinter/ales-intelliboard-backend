import { ICuradoriaDTO } from './CuradoriaDTO';
import { ICuradoriaRepository } from './repositories/ICuradoriaRepository';
import { IrunTest } from './helper/ITester';
export class CuradoriaUseCase {
  constructor(
    private curadoriaRepository: ICuradoriaRepository,
    private testerHelper: IrunTest
  ) {}
  async execute(
    nodeId: string,
    exampleId: string
  ): Promise<ICuradoriaDTO | ICuradoriaDTO[]> {
    if (exampleId && nodeId) {
      const node = await this.curadoriaRepository.getNode(nodeId);

      await this.testExample(node, exampleId);

      return node;
    } else if (nodeId) {
      const node = await this.curadoriaRepository.getNode(nodeId);

      await this.testOneNode(node);

      return node;
    } else {
      const nodes = await this.curadoriaRepository.getAllNodes();

      await this.testManyNodes(nodes);

      return nodes;
    }
  }

  private async testManyNodes(nodes: ICuradoriaDTO[]): Promise<void> {
    for (const node of nodes) {
      await this.testOneNode(node);
    }
  }

  private async testOneNode(node: ICuradoriaDTO): Promise<void> {
    const tests = node.examples.map((input) =>
      this.testerHelper.execute(input._id, input.text, node.expectedNode)
    );
    if (tests) {
      const results = await Promise.allSettled(tests);
      const failed = results.some(
        (e) => e.status === 'rejected' || !e.value.succeed
      );

      for (const result of results) {
        if (result.status === 'fulfilled') {
          const index = node.examples.findIndex(
            (e) => e._id === result.value.id
          );

          if (index > -1) {
            node.examples[index] = {
              _id: node.examples[index]._id,
              text: node.examples[index].text,
              ...result.value,
            };
          }
        }
      }
      node.succeed = !failed;
      await this.curadoriaRepository.save(node, ['examples']);
    }
  }

  private async testExample(
    node: ICuradoriaDTO,
    exampleId: string
  ): Promise<void> {
    const exampleIndex = node.examples.findIndex((e) => e._id === exampleId);
    if (exampleIndex < 0) return;
    const result = await this.testerHelper.execute(
      exampleId,
      node.examples[exampleIndex].text,
      node.expectedNode
    );

    if (!result.succeed) {
      node.succeed = false;
    }

    node.examples[exampleIndex] = {
      _id: node.examples[exampleIndex]._id,
      text: node.examples[exampleIndex].text,
      ...result,
    };

    await this.curadoriaRepository.save(node, ['examples']);
  }
}
