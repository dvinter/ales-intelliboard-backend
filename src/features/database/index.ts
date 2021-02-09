import { Mongodb } from './implementations/mongodb/Mongodb';
import { Database } from './implementations/Database';

export function WithDatabase(
  connectionString?: string,
  options?: Record<string, unknown>
): (req: unknown, res: unknown, next: () => void) => void {
  const database = new Database(
    new Mongodb(
      connectionString ?? process.env.MONGODB_STRING_CONNECTION,
      options ?? {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
      }
    )
  );
  return async (req: unknown, res: unknown, next: () => void) => {
    await database.connect();
    await next();
    // await database.disconnect();
  };
}
