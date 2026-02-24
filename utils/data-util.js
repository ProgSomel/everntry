export const replaceMongoIdInArray = (array) => {
  return array.map((item) => {
    const { _id, ...rest } = item.toObject();
    return { id: _id.toString(), ...rest };
  });
};

export const replaceMongoIdInObject = (item) => {
  const { _id, ...rest } = item.toObject();
  return { id: _id.toString(), ...rest };
};
