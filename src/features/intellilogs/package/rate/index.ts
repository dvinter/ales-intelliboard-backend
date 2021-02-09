import { RateRepository } from './repositories/implementations/RateRepository';
import { RateUseCase } from '../rate/RateUseCase';
import { RateController } from '../rate/RateController';
import { ResponseResolverAdapter } from '@/common/adapters/implementations/ResponseResolverAdapter';
import atendimento from '@/common/entities/Atendimento';

const rateRepository = new RateRepository(atendimento);

const rateUseCase = new RateUseCase(rateRepository);

const responseResolverAdapter = new ResponseResolverAdapter();

const rateController = new RateController(rateUseCase, responseResolverAdapter);

export { rateUseCase, rateController, rateRepository };
