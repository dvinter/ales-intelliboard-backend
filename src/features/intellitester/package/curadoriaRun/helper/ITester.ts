import { ICuradoriaEntity, ICuradoriaIntent } from '../CuradoriaDTO';

export interface ITestResult {
  id: string;
  succeed: boolean;
  obtainedOutput: string;
  obtainedNode: string;
  obtainedIntents?: ICuradoriaIntent[];
  obtainedEntities?: ICuradoriaEntity[];
}

export interface IrunTest {
  execute(
    id: string,
    input: string,
    expectedNode: string
  ): Promise<ITestResult>;
}
