const truncateStr = (str: string) => {
  const words = str.split(' ');
  const truncatedWords = words.slice(0, 2);
  const truncatedString = truncatedWords.join(' ');
  return truncatedString;
};

export const getSecondWord = (str: string) => {
  const words = str.split(' ');
  return words[1];
};

export default truncateStr;
