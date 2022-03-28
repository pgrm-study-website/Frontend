import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import PostItem from 'components/posts/PostItem';

const testDataList = [
  {
    postId: 1,
    title: '포폴용 프로젝트 디자이너 구합니다.',
    category: 2,
    tags: ['Designer', 'UI/UX'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '공모전 앱 만드실 분??',
    category: 0,
    tags: ['FrontEnd', 'BackEnd'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '웹프로젝트 처음부터 같이 만드실 분 모집중입니다!',
    category: 1,
    tags: ['FrontEnd', 'BackEnd', 'Designer', 'React', 'Spring'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '포폴용 프로젝트 디자이너 구합니다.',
    category: 2,
    tags: ['Designer', 'UI/UX'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '공모전 앱 만드실 분??',
    category: 0,
    tags: ['FrontEnd', 'BackEnd'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '웹프로젝트 처음부터 같이 만드실 분 모집중입니다!',
    category: 1,
    tags: ['FrontEnd', 'BackEnd', 'Designer', 'React', 'Spring'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
];

const PostList = () => {
  return (
    <Wrapper>
      <HeaderWrapper>
        <MessageText>최신 게시글</MessageText>
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
