import { Schema, model, models } from 'mongoose';
class User {
  private userSchema: Schema<never>;
  constructor() {
    this.userSchema = new Schema(
      {
        _id: { type: String },
        sectors: [String],
        isSupervisor: { type: Boolean, default: false },
        password: { type: String },
        rooms: [String],
        token: { type: String },
        readOnly: Boolean,
      },
      {
        timestamps: true,
      }
    );
  }
  getModel() {
    return model('user', this.userSchema);
  }
}

export default models.user || new User().getModel();
