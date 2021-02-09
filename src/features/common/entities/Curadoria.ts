import { Schema, model, Model, models } from 'mongoose';
class Curadoria {
  private curadoriaSchema: Schema<never>;
  private curadoriaModel: Model<never>;
  constructor() {
    this.curadoriaSchema = new Schema(
      {
        subject: String,
        expectedOutput: String,
        expectedNode: String,
        succeed: Boolean,
        responsible: String,
        flag: Boolean,
        examples: [
          {
            _id: String,
            text: String,
            succeed: Boolean,
            obtainedOutput: String,
            obtainedNode: String,
            obtainedEntities: [
              { entity: String, value: String, confidence: Number },
            ],
            obtainedIntents: [{ intent: String, confidence: Number }],
          },
        ],
      },
      {
        timestamps: true,
      }
    );

    this.curadoriaModel = model('curadoria', this.curadoriaSchema);
  }
  getModel() {
    return this.curadoriaModel;
  }
}

export default models.curadoria || new Curadoria().getModel();
