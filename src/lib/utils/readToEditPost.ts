import { readResponseType } from 'lib/api/posts';
import { tagList } from './tagDatabase';

const readToEditPost = (post: readResponseType) => {
  const tagIds = post.tags.map(i => tagList.indexOf(i));
  return {
    id: post.id,
    userId: post.userId,
    participantNum: post.participantNum,
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
