import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import PostItem from './PostItem';

export type postType = {
  post: {
    name: string;
    category: string;
    tags: string[];
    headcount: { now: number; max: number };
    star: number;
    comment: number;
    view: number;
  };
};
const testDataList = [
  {
    text: '마감 임박! 전승하님만 오시면 출발합니다.',
    list: [
      {
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
    ],
  },
  {
    text: '지금 인기있는 게시물을 확인해보세요.',
    list: [
      {
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
      {
        name: '공모전 앱 만드실 분??',
        category: '공모전',
        tags: ['FrontEnd', 'BackEnd', 'IOS', 'Android'],
        headcount: {
          now: 2,
          max: 3,
        },
        star: 60,
        comment: 21,
        view: 1200,
      },
      {
        name: 'Node.js 스터디 같이 하실분~~',
        category: '스터디',
        tags: ['Node.js', 'JavaScript'],
        headcount: {
          now: 5,
          max: 6,
        },
        star: 333,
        comment: 22,
        view: 467,
      },
    ],
  },
  {
    text: '전승하님이 관심 있을만한 팀을 모아봤어요.',
    list: [
      {
        name: '포폴용 프로젝트 프론트엔드 구합니다.',
        category: '프로젝트',
        tags: ['FrontEnd', 'Vue'],
        headcount: {
          now: 3,
          max: 4,
        },
        star: 5,
        comment: 8,
        view: 47,
      },
      {
        name: '공모전 프로젝트 만드실 분??',
        category: '공모전',
        tags: ['FrontEnd', 'BackEnd'],
        headcount: {
          now: 12,
          max: 13,
        },
        star: 0,
        comment: 1,
        view: 12,
      },
      {
        name: '데이터 분석 스터디 같이 하실분~~',
        category: '스터디',
        tags: ['Python', 'DeepLearning'],
        headcount: {
          now: 5,
          max: 6,
        },
        star: 3,
        comment: 2,
        view: 17,
      },
      {
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
    ],
  },
];

const Recommend = () => {
  const [page, setPage] = useState(0);
  const messageDiv = useRef<HTMLDivElement>(null);
  const postListDiv = useRef<HTMLDivElement>(null);

  let timer: NodeJS.Timeout | null = null;
  const updateCount = () => {
    if (timer === null) {
      timer = setInterval(() => {
        setPage(page => (page + 1) % 3);
        postListDiv.current?.animate(
          [
            { opacity: 0, transform: 'translateY(-5%)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 500,
            easing: 'linear',
            fill: 'forwards',
          },
        );
        messageDiv.current?.animate(
          [
            { opacity: 0, transform: 'translateY(-5%)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 500,
            easing: 'linear',
            fill: 'forwards',
          },
        );
      }, 5000);
    }
  };
  useEffect(() => {
    updateCount();
    return () => {
      if (timer !== null) {
        clearInterval(timer);
      }
    };
  }, [page]);

  const onClick = (dir: string) => {
    if (postListDiv.current === null) return;
    if (dir === 'left') {
      postListDiv.current.scrollLeft =
        Math.ceil(postListDiv.current.scrollLeft / 320) * 320 - 320;
    } else {
      postListDiv.current.scrollLeft =
        Math.floor(postListDiv.current.scrollLeft / 320) * 320 + 320;
    }
  };

  return (
    <Wrapper>
      <MessageText ref={messageDiv}>{testDataList[page].text}</MessageText>
      <PostListWrapper ref={postListDiv}>
        {testDataList[page].list.map((i, idx) => (
          <PostItem key={idx} post={i} />
        ))}
        {/* <MoveLeftButton onClick={() => onClick('left')}>
          <BsArrowLeft />
        </MoveLeftButton>
        <MoveRightButton onClick={() => onClick('right')}>
          <BsArrowRight />
        </MoveRightButton> */}
      </PostListWrapper>
    </Wrapper>
  );
};

export default Recommend;

const Wrapper = styled.div`
  position: relative;
  background-color: #474747;
  width: 100%;
  height: 300px;
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
  height: 25px;
  font-size: 25px;
  font-family: SuncheonR;
  color: white;
`;
const PostListWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
`;
const MoveButton = styled.div`
  position: absolute;
  top: 135px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    color: white;
    width: 28px;
    height: 28px;
  }
  cursor: pointer;
  transition: background-color 0.15s linear;
  &:hover {
    background-color: #646464;
  }
`;
const MoveLeftButton = styled(MoveButton)`
  left: 10px;
`;
const MoveRightButton = styled(MoveButton)`
  right: 10px;
`;
