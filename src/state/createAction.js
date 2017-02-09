export function createAction(type, payloadCreator = () => {}) {
  return (...args) => {
    const createdPayload = payloadCreator(...args) || {};
    return {
      type,
      ...createdPayload,
    };
  }
}
