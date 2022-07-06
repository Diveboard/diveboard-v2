export const incrementId = <T extends { id: number }>(array:T[]) => {
  if (!array.length) {
    return 1;
  }
  let nextId = array[array.length - 1].id;
  return ++nextId;
};
