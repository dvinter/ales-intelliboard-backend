import { IrunTest, ITestResult } from './helper/ITester';
export class CuradoriaUseCase {
  constructor(private testerHelper: IrunTest) {}
  async execute(text: string): Promise<ITestResult> {
    return this.testerHelper.execute(text);
  }
}
