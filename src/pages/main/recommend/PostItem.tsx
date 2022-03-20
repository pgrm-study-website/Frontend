import React from 'react';
import styled from 'styled-components';
import { postType } from './Recommend';
import PostCategory from 'components/post/postCategory';
import PostTag from 'components/post/postTag';

const PostItem = ({ post }: postType) => {
  return (
    <Wrapper>
      <FirstWrapper>
        <Name>{post.name}</Name>
        <PostCategory category={post.category} />
        <TagWrapper>
          {post.tags.map(i => (
            <PostTag key={i} tag={i} />
          ))}
        </TagWrapper>
      </FirstWrapper>
      <SecondWrapper>
        <PersonWrapper>
          <div>{post.headcount.now}</div>
          <div>{post.headcount.max}</div>
        </PersonWrapper>
        <EtcWrapper>
          <div>{post.star}</div>
          <div>{post.comment}</div>
          <div>{post.view}</div>
        </EtcWrapper>
      </SecondWrapper>
    </Wrapper>
  );
};

export default PostItem;

const Wrapper = styled.div`
  width: 300px;
  min-width: 300px;
  height: 100%;
  background-color: white;
  overflow: hidden;
  border-radius: 10px;
  padding: 10px;
  & + & {
    margin-left: 20px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;
const FirstWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const Name = styled.div`
  font-size: 24px;
  line-height: normal;
  font-family: NanumSquareR;
  height: 54px;
  max-height: 54px;
  margin-bottom: 6px;
`;
const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;
const SecondWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
const PersonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const EtcWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
