import { Schema, model, Model, models } from 'mongoose';

class Image {
  private imageSchema: Schema<never>;
  private imageModel: Model<never>;
  constructor() {
    this.imageSchema = new Schema(
      {
        data: Buffer,
        contentType: String,
      },
      {
        timestamps: true,
      }
    );
    this.imageModel = model('image', this.imageSchema);
  }
  getModel() {
    return this.imageModel;
  }
}

export default models.image || new Image().getModel();
