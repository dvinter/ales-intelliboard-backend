export interface IImageHelper {
  insertImagesOnDatabaseConvertBase64ToImageLink(
    awnser: string
  ): Promise<string>;
}
