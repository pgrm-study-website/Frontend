import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PostItem from 'components/posts/PostItem';
import { postListItemType } from 'lib/api/posts';
import { LoadingBox } from 'components/common/Loading';

const PostList = ({ normalList }: { normalList: any }) => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <MessageText>최신 게시글</MessageText>
        <MoreWrapper to="/posts">더보기</MoreWrapper>
      </HeaderWrapper>
      <PostListWrapper>
        {normalList ? (
          normalList.map(
            (i: postListItemType, idx: React.Key | null | undefined) => (
              <PostItem key={idx} post={i} />
            ),
          )
        ) : (
          <div style={{ width: '100%', height: '420px' }}>
            <LoadingBox r="100px" />
          </div>
        )}
      </PostListWrapper>
    </Wrapper>
  );
};

export default PostList;

const Wrapper = styled.div`
  background-color: #e2e2e2;
  width: 100%;
  height: 100%;
  min-height: 500px;
  padding: 25px 20px;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const MessageText = styled.div`
  font-size: 30px;
  font-family: SuncheonR;
`;
const MoreWrapper = styled(Link)`
  font-size: 20px;
  font-family: NanumSquareR;
  color: #464646;
`;
const PostListWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
