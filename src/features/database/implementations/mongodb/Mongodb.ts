import { connect, ConnectionOptions, Mongoose } from 'mongoose';
import { IDatabase } from '@/database/IDatabase';
export class Mongodb implements IDatabase {
  private client?: Mongoose;
  private connectionUrl: string;
  constructor(
    connectionUrl?: string,
    private connection_options?: ConnectionOptions
  ) {
    if (!connectionUrl) {
      throw {
        message: 'Missing connection string url',
      };
    }
    this.connectionUrl = connectionUrl;
  }
  async connect(): Promise<void> {
    this.client = await connect(this.connectionUrl, this.connection_options);
  }
  async disconnect(): Promise<void> {
    this.client?.disconnect();
  }
}
