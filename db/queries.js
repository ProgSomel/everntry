import eventModel from "@/models/event-model";
import userModel from "@/models/user-model";
import tokenModel from "@/models/token-model";
import { replaceMongoIdInArray, replaceMongoIdInObject } from "@/utils/data-util";
import crypto from "crypto";

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

async function toggleInterested(eventId, userId) {
  const event = await eventModel.findById(eventId);
  const isInterested = event?.interested_ids.map(String).includes(String(userId));

  if (isInterested) {
    await eventModel.findByIdAndUpdate(eventId, {
      $pull: { interested_ids: userId },
    });
  } else {
    await eventModel.findByIdAndUpdate(eventId, {
      $addToSet: { interested_ids: userId },
    });
  }
}

async function toggleGoing(eventId, userId) {
  const event = await eventModel.findById(eventId);
  const isGoing = event?.going_ids.map(String).includes(String(userId));

  if (isGoing) {
    await eventModel.findByIdAndUpdate(eventId, {
      $pull: { going_ids: userId },
    });
  } else {
    await eventModel.findByIdAndUpdate(eventId, {
      $addToSet: { going_ids: userId },
    });
  }
}

async function createConfirmationToken(eventId, userId) {
  const token = crypto.randomBytes(32).toString("hex");
  await tokenModel.create({ token, eventId, userId });
  return token;
}

async function confirmGoing(token) {
  const record = await tokenModel.findOne({ token });
  if (!record) return { success: false, message: "Invalid or expired token." };

  await eventModel.findByIdAndUpdate(record.eventId, {
    $addToSet: { going_ids: record.userId },
  });

  await tokenModel.deleteOne({ token });
  return { success: true, eventId: record.eventId };
}

export { getAllEvents, getEventById, createUser, getUserByEmail, toggleInterested, toggleGoing, createConfirmationToken, confirmGoing };
