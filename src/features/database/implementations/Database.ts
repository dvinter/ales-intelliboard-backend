import { IDatabase } from '../IDatabase';

export class Database implements IDatabase {
  constructor(private databaseConnector: IDatabase) {}
  async connect(): Promise<void> {
    this.databaseConnector.connect();
  }
  async disconnect(): Promise<void> {
    this.databaseConnector.disconnect();
  }
}
