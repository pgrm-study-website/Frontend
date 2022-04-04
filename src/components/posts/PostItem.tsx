import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs';
import styled, { css } from 'styled-components';
import { postListItemType } from 'lib/api/posts';

import PostCategory from 'components/posts/PostCategory';
import PostTagA from 'components/posts/PostTagA';

const PostItem = ({ post }: { post: postListItemType }) => {
  return (
    <Wrapper to={`/posts/${post.id}`} status={post.status}>
      <FirstWrapper>
        <Name>{post.title}</Name>
        <PostCategory category={post.category} />
        <TagWrapper>
          {post.tags.map(i => (
            <PostTagA key={i} tag={i} />
          ))}
        </TagWrapper>
      </FirstWrapper>
      <SecondWrapper>
        <PersonWrapper>
          <BsFillPersonFill />
          <div>{post.participantNum}</div>
          <div>/</div>
          <div>{post.participantMax}</div>
        </PersonWrapper>
        <EtcWrapper>
          <BsFillEyeFill />
          <div>{post.viewCount}</div>
        </EtcWrapper>
      </SecondWrapper>
    </Wrapper>
  );
};

export default PostItem;

const Wrapper = styled(Link)<{ status: string }>`
  ${props =>
    props.status === '모집 완료' &&
    css`
      filter: contrast(20%);
    `}
  width: calc(calc(100% - calc(10px * 3)) / 3);
  min-width: calc(calc(100% - calc(10px * 3)) / 3);
  height: 200px;
  background-color: #ffffff;
  border: 1px solid #c2c2c2;
  overflow: hidden;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: border 0.15s linear;
  &:hover {
    border: 1px solid #686868;
    background-color: #ffffff;
  }
  @media all and (max-width: 930px) {
    width: calc(calc(100% - calc(10px * 2)) / 2);
    min-width: calc(calc(100% - calc(10px * 2)) / 2);
  }
  @media all and (max-width: 900px) {
    width: calc(calc(100% - calc(10px * 3)) / 3);
    min-width: calc(calc(100% - calc(10px * 3)) / 3);
  }
  @media all and (max-width: 750px) {
    width: calc(calc(100% - calc(10px * 2)) / 2);
    min-width: calc(calc(100% - calc(10px * 2)) / 2);
  }
  @media all and (max-width: 510px) {
    width: calc(100% - 10px);
    min-width: calc(100% - 10px);
  }
`;
const FirstWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
`;
const Name = styled.div`
  font-size: 24px;
  font-family: NanumSquareR;
  line-height: 27px;
  height: 54px;
  max-height: 54px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
const TagWrapper = styled.div`
  width: 100%;
  max-height: 60px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  margin-top: 4px;
`;
const SecondWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 16px;
`;
const PersonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #464646;
  svg {
    margin: 0 3px 0 0;
  }
  div + div {
    margin-left: 1px;
  }
`;
const EtcWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    margin: 0 3px 0 8px;
  }
  svg:nth-child(1) {
    color: #818181;
  }
`;
