import { ICuradoriaDTO } from '../CuradoriaDTO';

export interface IMailFields {
  project?: string;
  newData?: ICuradoriaDTO;
  oldData?: ICuradoriaDTO;
  alteredFields?: string[];
}

export interface IMailHelper {
  sendCuradoriaItemCreatedMail(infos: IMailFields): void;
}
