import { genSaltSync, hashSync } from 'bcrypt';
import { IUserHelper } from '../IUserHelper';

export class UserHelper implements IUserHelper {
  hashGenerator(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
}
