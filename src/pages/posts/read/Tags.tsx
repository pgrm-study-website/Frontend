import React from 'react';
import { Link } from 'react-router-dom';
import { tagList } from 'lib/utils/tagDatabase';
import styled from 'styled-components';

import PostTagA from 'components/posts/PostTagA';

const Tags = ({ tags }: { tags: string[] }) => {
  return (
    <Wrapper>
      {tags.map(i => (
        <Link key={i} to={`/posts?page=1&tagIds=${tagList.indexOf(i)}`}>
          <PostTagA tag={i} />
        </Link>
      ))}
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 20px 0;
`;
