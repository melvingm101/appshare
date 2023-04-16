const upperCaseFirstLetter = (str: string) =>
  `${str.slice(0, 1).toUpperCase()}${str.slice(1)}`;

const lowerCaseAllWordsExceptFirstLetters = (str: string) =>
  str.replaceAll(
    /\S*/g,
    (word: string) => `${word.slice(0, 1)}${word.slice(1).toLowerCase()}`
  );

export const tagConvert = (str: string) => {
  return upperCaseFirstLetter(lowerCaseAllWordsExceptFirstLetters(str));
};
