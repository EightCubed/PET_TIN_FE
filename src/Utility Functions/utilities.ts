export const formatURL = (...args: string[]) => {
  return args.reduce(
    (addedElement, currentElement) => addedElement + "/" + currentElement,
    ""
  );
};
