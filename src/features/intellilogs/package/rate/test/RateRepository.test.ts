import { it, describe } from 'mocha';
import assert from 'assert';
import sinon from 'sinon';
import atendimento from '@/common/entities/Atendimento';
import { RateRepository } from '@/intellilogs/package/rate/repositories/implementations/RateRepository';
import { IrateStates } from '../RateDTO';
describe('Rate repository test', () => {
  const stub = sinon.stub(atendimento, 'findOneAndUpdate');
  before(() => {
    stub
      .withArgs(
        {
          _id: 'notexist',
        },
        { rating: 'GOOD' },
        { omitUndefined: true }
      )
      .resolves(null);
    stub
      .withArgs(
        {
          _id: 'existID',
        },
        { rating: 'BAD' },
        { omitUndefined: true }
      )
      .resolves({});
  });
  it('if dont have register with specific id with "BAD" state to change rate', () => {
    assert.rejects(
      async () =>
        await new RateRepository(atendimento).setRate(
          'notexist',
          'BAD' as IrateStates
        )
    );
  });
  it('if dont have register with specific id with "GOOD" to change rate', () => {
    assert.doesNotThrow(
      async () =>
        await new RateRepository(atendimento).setRate(
          'existID',
          'GOOD' as IrateStates
        )
    );
  });
});
