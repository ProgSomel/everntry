import { Schema, model, models } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  
  location: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  interested_ids: {
    type: Array,
    default: [],
    required: false,
  },
  going_ids: {
    type: Array,
    default: [],
    required: false,
  },
  swags: {
    type: Array,
    default: [],
    required: false,
  },
});

const eventModel = models.events || model("events", eventSchema);

export default eventModel;
