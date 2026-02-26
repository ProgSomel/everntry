import eventModel from "@/models/event-model";
import userModel from "@/models/user-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";

async function getAllEvents() {
  const allEvents = await eventModel.find();
  return replaceMongoIdInArray(allEvents);
}

async function getEventById(id) {
  const event = await eventModel.findById(id);
  return replaceMongoIdInObject(event);
}

async function createUser(data) {
  const user = await userModel.create(data);
  return replaceMongoIdInObject(user);
}

async function getUserByEmail(email) {
  const user = await userModel.findOne({ email });
  return user ? replaceMongoIdInObject(user) : null;
}

export { getAllEvents, getEventById, createUser, getUserByEmail };
