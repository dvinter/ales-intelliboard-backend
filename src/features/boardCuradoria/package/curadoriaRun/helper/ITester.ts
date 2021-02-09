export interface ITestResult {
  nodeId: string;
  output?: string;
}

export interface IrunTest {
  execute(text: string): Promise<ITestResult>;
}
