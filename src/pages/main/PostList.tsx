import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PostItem from 'components/posts/PostItem';

const testDataList = [
  {
    postId: 1,
    name: 'Node.js 스터디 같이 하실분~~',
    category: '스터디',
    tags: ['Node.js', 'JavaScript'],
    headcount: {
      now: 5,
      max: 6,
    },
    star: 3,
    comment: 2,
    view: 17,
  },
  {
    postId: 1,
    name: '포폴용 프로젝트 디자이너 구합니다.',
    category: '프로젝트',
    tags: ['Designer', 'UI/UX'],
    headcount: {
      now: 3,
      max: 4,
    },
    star: 5,
    comment: 8,
    view: 47,
  },
  {
    postId: 1,
    name: '공모전 앱 만드실 분??',
    category: '공모전',
    tags: ['FrontEnd', 'BackEnd'],
    headcount: {
      now: 2,
      max: 3,
    },
    star: 0,
    comment: 1,
    view: 12,
  },
  {
    postId: 1,
    name: '파이썬 코딩테스트 스터디',
    category: '스터디',
    tags: ['Python'],
    headcount: {
      now: 3,
      max: 4,
    },
    star: 22,
    comment: 12,
    view: 120,
  },
  {
    postId: 1,
    name: '웹프로젝트 처음부터 같이 만드실 분 모집중입니다!',
    category: '프로젝트',
    tags: ['FrontEnd', 'BackEnd', 'Designer', 'React', 'Spring'],
    headcount: {
      now: 4,
      max: 6,
    },
    star: 10,
    comment: 21,
    view: 72,
  },
  {
    postId: 1,
    name: '포폴용 프로젝트 디자이너 구합니다.',
    category: '프로젝트',
    tags: ['Designer', 'UI/UX'],
    headcount: {
      now: 3,
      max: 4,
    },
    star: 25,
    comment: 28,
    view: 447,
  },
];

const PostList = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <MessageText>게시물 목록</MessageText>
        <MoreWrapper to="/posts">더보기</MoreWrapper>
      </HeaderWrapper>
      <PostListWrapper>
        {testDataList.map((i, idx) => (
          <PostItem key={idx} post={i} />
        ))}
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
