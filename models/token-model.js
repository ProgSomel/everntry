import { Schema, model, models } from "mongoose";

const tokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 }, // expires in 24h
});

const tokenModel = models.tokens || model("tokens", tokenSchema);

export default tokenModel;
