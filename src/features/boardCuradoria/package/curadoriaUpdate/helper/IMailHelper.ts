import { ICuradoriaDTO } from '../CuradoriaDTO';

export interface IMailFields {
  project?: string;
  newData?: ICuradoriaDTO;
  oldData?: ICuradoriaDTO;
  alteredFields?: string[];
}

export interface IMailHelper {
  sendCuradoriaItemUpdatedMail(infos: IMailFields): void;
}
