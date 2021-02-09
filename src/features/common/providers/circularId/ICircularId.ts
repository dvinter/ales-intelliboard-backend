export interface ICircularId {
  getId(projectName: string): Promise<string>;
}
