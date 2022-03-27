import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import RecommendPostItem from './RecommendPostItem';

const testDataList = [
  {
    text: '마감 임박! 전승하님만 오시면 출발합니다.',
    list: [
      {
        postId: 1,
        title: 'Node.js 스터디 같이 하실분~~',
        category: 1,
        tags: ['Node.js', 'JavaScript'],
        status: 1,
        participantNum: 5,
        participantMax: 6,
        period: 3,
        viewCount: 26,
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
    ],
  },
  {
    text: '지금 인기있는 게시물을 확인해보세요.',
    list: [
      {
        postId: 1,
        title: '포폴용 프로젝트 디자이너 구합니다.',
        category: 2,
        tags: ['Designer', 'UI/UX'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
      {
        postId: 1,
        title: '공모전 앱 만드실 분??',
        category: 1,
        tags: ['FrontEnd', 'BackEnd', 'IOS', 'Android'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
      {
        postId: 1,
        title: 'Node.js 스터디 같이 하실분~~',
        category: 2,
        tags: ['Node.js', 'JavaScript'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
    ],
  },
  {
    text: '전승하님이 관심 있을만한 팀을 모아봤어요.',
    list: [
      {
        postId: 1,
        title: '포폴용 프로젝트 프론트엔드 구합니다.',
        category: 0,
        tags: ['FrontEnd', 'Vue.js'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
      {
        postId: 1,
        title: '공모전 프로젝트 만드실 분??',
        category: 1,
        tags: ['FrontEnd', 'BackEnd'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
      {
        postId: 1,
        title: '데이터 분석 스터디 같이 하실분~~ 긴 제목을 가진 게시물',
        category: 2,
        tags: ['Python', 'DeepLearning', 'FrontEnd', 'BackEnd', 'Node.js'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
      {
        postId: 1,
        title: '파이썬 코딩테스트 스터디',
        category: 0,
        tags: ['Python'],
        status: 0,
        participantNum: 4,
        participantMax: 5,
        period: 4,
        viewCount: 126,
      },
    ],
  },
];

const Recommend = () => {
  const [page, setPage] = useState(0);
  const messageDiv = useRef<HTMLDivElement>(null);
  const postListDiv = useRef<HTMLDivElement>(null);

  let timer: NodeJS.Timeout | null = null;
  const changePage = () => {
    if (timer === null) {
      timer = setInterval(() => {
        setPage(page => (page + 1) % 3);
        messageDiv.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 300,
          easing: 'linear',
          fill: 'forwards',
        });
        postListDiv.current?.animate(
          [
            { opacity: 0, transform: 'translateY(-5%)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 300,
            easing: 'linear',
            fill: 'forwards',
          },
        );
      }, 10000);
    }
  };

  useEffect(() => {
    changePage();
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [page]);

  return (
    <Wrapper>
      <MessageText ref={messageDiv}>{testDataList[page].text}</MessageText>
      <PostListWrapper ref={postListDiv}>
        {testDataList[page].list.map((i, idx) => (
          <RecommendPostItem key={idx} post={i} />
        ))}
      </PostListWrapper>
    </Wrapper>
  );
};

export default Recommend;

const Wrapper = styled.div`
  position: relative;
  background-color: #474747;
  width: 100%;
  min-height: 300px;
  padding: 25px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const MessageText = styled.div`
  line-height: 30px;
  font-size: 25px;
  margin-bottom: 15px;
  font-family: SuncheonR;
  color: white;
`;
const PostListWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: visible;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
`;
