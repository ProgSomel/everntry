export const BLUR_DATA_URL = `data:image/svg+xml;base64,${btoa('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"><rect fill="#f0f0f0" width="1" height="1"/></svg>')}`;

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
