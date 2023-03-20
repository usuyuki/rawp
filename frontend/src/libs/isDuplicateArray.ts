export const isDuplicateArray = (elements:Array<T>):boolean => {
  const setElements = new Set(elements);
  return setElements.size !== elements.length;
};
