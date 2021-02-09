import { IAtendimentoRepository } from './repositories/IAtendimentoRepository';
export class AtendimentoUseCase {
  constructor(private atendimentoRepository: IAtendimentoRepository) {}
  async execute(id: string, reviewed: boolean): Promise<void> {
    await this.atendimentoRepository.updateReviewed(id, reviewed);
  }
}
