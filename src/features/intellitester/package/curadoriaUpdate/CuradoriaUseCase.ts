import { ICuradoriaDTO } from './CuradoriaDTO';
import { ICuradoriaRepository } from './repositories/ICuradoriaRepository';
export class CuradoriaUseCase {
  constructor(private curadoriaRepository: ICuradoriaRepository) {}
  execute(id: string, expectedNode: string): Promise<ICuradoriaDTO> {
    return this.curadoriaRepository.updateExpectedNode(id, expectedNode);
  }
}
