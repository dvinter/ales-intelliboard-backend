export interface IAssistantService {
  updateNode(nodeId: string, output: string): Promise<void>;
}
