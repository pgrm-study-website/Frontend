import { tagList } from './tagDatabase';

const autoCompleteTag = (state: string[], input: string) => {
  if (input === '') return [];
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
