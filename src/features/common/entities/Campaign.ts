import { Schema, model, Model, models } from 'mongoose';
class Campaign {
  private campaignSchema: Schema<never>;
  private campaignModel: Model<never>;
  constructor() {
    this.campaignSchema = new Schema(
      {
        hasStarted: Boolean,
        schedule: Boolean,
        campaignTotalSended: Number,
        campaignTotalUsers: Number,
      },
      {
        timestamps: true,
      }
    );

    this.campaignModel = model('campaigns', this.campaignSchema);
  }
  getModel() {
    return this.campaignModel;
  }
}

export default models.campaigns || new Campaign().getModel();
