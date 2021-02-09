import { IImageHelper } from '../IImageHelper';
import { IImageRepository } from '../../repositories/IImageRepository';

export class ImageHelper implements IImageHelper {
  constructor(
    private imageRepository: IImageRepository,
    private projectUrl: string,
    private imageSrcRegex = /src\s*=\s*"(.+?)"/g,
    private imageTagRegex = /<img.*>/g,
    private apiPath = '/api/image/'
  ) {}

  async insertImagesOnDatabaseConvertBase64ToImageLink(
    anwser: string
  ): Promise<string> {
    if (anwser && this.imageTagRegex.test(anwser)) {
      const base64Images = this._getBase64Images(anwser);
      const imagesData = base64Images.map((e) => this.convertBase64ToData(e));
      const databaseImages = await this._insertImagesOnDatabase(imagesData);

      databaseImages.forEach((e, index) => {
        anwser = anwser.replace(
          `${base64Images[index]}`,
          `${this.projectUrl}${this.apiPath}${e._id}" style="max-width: 100%"`
        );
      });
    }
    return anwser;
  }

  private _getBase64Images(anwser: string) {
    const srcImages = [];
    const SRC_TEXT = 'src="';
    const HTTP_TEXT = 'http://';
    const HTTPS_TEXT = 'https://';
    let data: RegExpExecArray | null;
    while ((data = this.imageSrcRegex.exec(anwser)) !== null)
      srcImages.push(data[0].replace(SRC_TEXT, '')); // remove text src=
    const base64Images = srcImages.filter(
      (src) => !(src.includes(HTTP_TEXT) || src.includes(HTTPS_TEXT))
    ); // get only base64 images
    return base64Images;
  }

  private convertBase64ToData(base64Image: string) {
    const data = base64Image.split(',')[1];
    const contentType = base64Image.substring(
      base64Image.indexOf(':') + 1,
      base64Image.indexOf(';')
    );
    return {
      data,
      contentType,
    };
  }

  private _insertImagesOnDatabase(
    imagesData: Array<{ data: string; contentType: string }>
  ) {
    return Promise.all(
      imagesData.map((e) =>
        this.imageRepository.create(
          Buffer.from(e.data, 'base64'),
          e.contentType
        )
      )
    );
  }
}
