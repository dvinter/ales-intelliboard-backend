export interface IAssistantService {
  createNode(output: string): Promise<string>;
}
