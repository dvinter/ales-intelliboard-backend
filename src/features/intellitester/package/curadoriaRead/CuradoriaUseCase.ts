import { ICuradoriaDTO } from './CuradoriaDTO';
import { ICuradoriaRepository } from './repositories/ICuradoriaRepository';
export class CuradoriaUseCase {
  constructor(private curadoriaRepository: ICuradoriaRepository) {}
  execute(id?: string): Promise<ICuradoriaDTO | ICuradoriaDTO[] | null> {
    if (id) {
      return this.curadoriaRepository.findById(id);
    } else {
      return this.curadoriaRepository.getAll();
    }
  }
}
