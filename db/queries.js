import eventModel from "@/models/event-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

async function getAllEvents() {
  const allEvents = await eventModel.find();
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(id) {
  const event = await eventModel.findById(id);
  return replaceMongoIdInObject(event);
}

export { getAllEvents, getEventById };
