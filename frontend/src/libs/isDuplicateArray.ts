export const isDuplicateArray = (elements:any[]):boolean => {
  const setElements = new Set(elements);
  return setElements.size !== elements.length;
};
