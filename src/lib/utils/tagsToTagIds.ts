import { tagList } from './tagDatabase';

const tagsToTagIds = (state: string[]) => {
  return state.map(i => tagList.indexOf(i));
};

export default tagsToTagIds;
