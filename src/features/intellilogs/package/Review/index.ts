import { AtendimentoRepository } from './repositories/implementations/AtendimentoRepository';
import { AtendimentoUseCase } from './AtendimentoUseCase';
import { AtendimentoController } from './AtendimentoController';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import atendimentoModel from '@/common/entities/Atendimento';

const atendimentoRepository = new AtendimentoRepository(atendimentoModel);

const atendimentoUseCase = new AtendimentoUseCase(atendimentoRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const atendimentoController = new AtendimentoController(
  atendimentoUseCase,
  responseResolverAdapter
);

export { atendimentoUseCase, atendimentoController };
