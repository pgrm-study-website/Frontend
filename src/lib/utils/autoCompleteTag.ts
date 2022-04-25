import { tagList } from './tagDatabase';

const autoCompleteTag = (state: string[], input: string, maxLength: number) => {
  if (input === '' || state.length === maxLength) return [];
  const result: string[] = [];
  for (let i = 0; i < tagList.length; i++) {
    const tagName = tagList[i];
    if (
      tagName.toLowerCase().includes(input.toLowerCase()) &&
      !state.includes(tagName)
    ) {
      result.push(tagName);
    }
  }
  return result;
};

export default autoCompleteTag;
