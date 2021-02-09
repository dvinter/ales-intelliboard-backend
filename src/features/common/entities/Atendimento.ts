import { Schema, model, Model, models } from 'mongoose';
class Atendimento {
  private atendimentoSchema: Schema<never>;
  private atendimentoModel: Model<never>;
  constructor() {
    this.atendimentoSchema = new Schema(
      {
        project: { type: String },
        sector: { type: String },
        messages: [
          {
            text: String,
            date: Date,
            from: String,
            context: String,
            misunderstood: Boolean,
          },
        ],
        endedAt: { type: Date },
        user: { type: Object },
        rating: { type: String, enum: ['GOOD', 'BAD'] },
        observations: { type: String },
        reviewed: { type: Boolean, default: false },
        rooms: [{ type: String }],
        platform: { type: String },
      },
      {
        timestamps: true,
      }
    );

    this.atendimentoModel = model('atendimentos', this.atendimentoSchema);
  }
  getModel() {
    return this.atendimentoModel;
  }
}

export default models.atendimentos || new Atendimento().getModel();
