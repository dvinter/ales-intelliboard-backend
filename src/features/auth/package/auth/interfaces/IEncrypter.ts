export interface IEncrypter {
  compare(value: string, hash: string): Promise<boolean>;
}
