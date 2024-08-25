import { JsonObject, JsonArray, JsonValue } from '../types';

export const filterJson = (data: JsonObject | JsonArray, query: string): JsonObject | JsonArray => {
  if (!query) return data;

  const lowerCaseQuery = query.toLowerCase();

  const filterObject = (obj: JsonObject | JsonArray): JsonObject | JsonArray => {
    if (Array.isArray(obj)) {
      return obj
        .map((item) => (isJsonObjectOrArray(item) ? filterObject(item) : item))
        .filter((item) => isJsonObjectOrArray(item) && Object.keys(item).length > 0) as JsonArray;
    }

    return Object.entries(obj).reduce<JsonObject>((acc, [key, value]) => {
      if (isJsonObjectOrArray(value)) {
        const filtered = filterObject(value);
        if (Object.keys(filtered).length > 0) {
          acc[key] = filtered;
        }
      }
      if (key.toLowerCase().includes(lowerCaseQuery)) {
        acc[key] = value;
      }
      return acc;
    }, {});
  };

  return filterObject(data);
};

const isJsonObjectOrArray = (value: JsonValue): value is JsonObject | JsonArray => {
  return value !== null && typeof value === 'object';
};
