import { readResponseType } from 'lib/api/posts';
import { tagList } from './tagDatabase';

const readToEditPost = (post: readResponseType) => {
  const tagIds = post.tags.map(i => tagList.indexOf(i));
  return {
    userId: post.userId,
    title: post.title,
    category: post.category,
    content: post.content,
    tagIds: tagIds,
    participantMax: post.participantMax,
    period: post.period,
    status: post.status,
  };
};

export default readToEditPost;
