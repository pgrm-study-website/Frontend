import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillPersonFill, BsFillEyeFill } from 'react-icons/bs';
import { postListItemType } from 'lib/api/posts';
import styled, { css } from 'styled-components';

import PostCategory from 'components/posts/PostCategory';
import PostTagA from 'components/posts/PostTagA';

const RecommendPostItem = ({ post }: { post: postListItemType }) => {
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
          {post.participantMax && (
            <>
              <div>/</div>
              <div>{post.participantMax}</div>
            </>
          )}
        </PersonWrapper>
        <EtcWrapper>
          <BsFillEyeFill />
          <div>{post.viewCnt}</div>
        </EtcWrapper>
      </SecondWrapper>
    </Wrapper>
  );
};

export default RecommendPostItem;

const Wrapper = styled(Link)<{ status: string }>`
  ${props =>
    props.status === '모집 완료' &&
    css`
      filter: contrast(60%);
      opacity: 0.8;
    `}
  width: calc(calc(100% - calc(25px * 3)) / 4);
  min-width: calc(calc(100% - calc(25px * 3)) / 4);
  height: 100%;
  background-color: white;
  overflow: hidden;
  border-radius: 10px;
  padding: 10px;
  & + & {
    margin-left: 25.1px;
  }
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: transform 0.15s linear;
  &:hover {
    transform: scale(105%);
  }
  @media all and (max-width: 1205px) {
    width: calc(calc(100% - calc(25px * 2)) / 3);
    min-width: calc(calc(100% - calc(25px * 2)) / 3);
  }
  @media all and (max-width: 930px) {
    width: calc(calc(100% - calc(25px * 1)) / 2);
    min-width: calc(calc(100% - calc(25px * 1)) / 2);
  }
  @media all and (max-width: 900px) {
    width: calc(calc(100% - calc(25px * 2)) / 3);
    min-width: calc(calc(100% - calc(25px * 2)) / 3);
  }
  @media all and (max-width: 750px) {
    width: calc(calc(100% - calc(25px * 1)) / 2);
    min-width: calc(calc(100% - calc(25px * 1)) / 2);
  }
  @media all and (max-width: 510px) {
    width: 100%;
    min-width: 100%;
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
  margin-top: 10px;
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
    margin: 0 5px 0 8px;
  }
  svg:nth-child(1) {
    color: #818181;
  }
`;
