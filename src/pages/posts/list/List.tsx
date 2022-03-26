import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
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
  {
    postId: 1,
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
    postId: 1,
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
  {
    postId: 1,
    name: '포폴용 프로젝트 프론트엔드 구합니다.',
    category: '프로젝트',
    tags: ['FrontEnd', 'Vue.js'],
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
    postId: 1,
    name: '데이터 분석 스터디 같이 하실분~~ 긴 제목을 가진 게시물',
    category: '스터디',
    tags: ['Python', 'DeepLearning', 'FrontEnd', 'BackEnd', 'Node.js'],
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
];

const List = () => {
  const [foldOption, setFoldOption] = useState(false);

  return (
    <Wrapper>
      <HeaderWrapper>
        <MessageText>게시물 목록</MessageText>
        <SearchWrapper>
          <SearchInput placeholder="Search" />
          <BsSearch />
        </SearchWrapper>
      </HeaderWrapper>
      <OptionWrapper>
        <SummaryButtonWrapper>
          <SummaryButton onClick={() => setFoldOption(!foldOption)}>
            <div>검색 옵션</div>
            <div>{foldOption ? '▼' : '◀'}</div>
          </SummaryButton>
        </SummaryButtonWrapper>
        {foldOption && (
          <SummaryWrapper>검색 옵션 영역 (추후 개발 예정)</SummaryWrapper>
        )}
      </OptionWrapper>
      <PostListWrapper>
        {testDataList.map((i, idx) => (
          <PostItem key={idx} post={i} />
        ))}
      </PostListWrapper>
      <PageMoveWrapper>
        <PageSmallNumber>1</PageSmallNumber>
        <PageDot>···</PageDot>
        <PageNumber>4</PageNumber>
        <PageLargeNumber>5</PageLargeNumber>
        <PageNumber>6</PageNumber>
        <PageNumber>7</PageNumber>
        <PageDot>···</PageDot>
        <PageSmallNumber>26</PageSmallNumber>
      </PageMoveWrapper>
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.div`
  background-color: #e2e2e2;
  width: 100%;
  height: 100%;
  min-height: 800px;
  padding: 40px 20px 30px 20px;

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
const SearchWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  svg {
    width: 30px;
    height: 30px;
    margin-left: 7px;
    cursor: pointer;
    color: #545454;
  }
  @media all and (max-width: 570px) {
    max-width: 100%;
    margin-top: 20px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border: 2.5px solid #545454;
  border-radius: 5px;
  padding: 0 5px;
  background-color: #e1e1e1;
`;
const OptionWrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;
const SummaryButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const SummaryButton = styled.div`
  display: flex;
  font-size: 20px;
  font-family: NanumSquareR;
  cursor: pointer;
  color: #5c5c5c;
  div + div {
    margin-left: 5px;
  }
`;
const SummaryWrapper = styled.div`
  width: 100%;
  height: 200px; //임시
  margin-top: 10px;
  background-color: #46464644;
  animation: smoothAppear 0.2s ease-in-out 0s 1 normal forwards;
  @keyframes smoothAppear {
    from {
      height: 0px;
    }
    to {
      height: 200px;
    }
  }
`;
const PostListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const PageMoveWrapper = styled.div`
  margin: 25px 0 30px 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageNumber = styled.div`
  font-size: 25px;
  margin: 0 10px;
  color: #565656;
  cursor: pointer;
`;
const PageSmallNumber = styled.div`
  font-size: 20px;
  margin: 0 10px;
  color: #565656;
  cursor: pointer;
`;
const PageLargeNumber = styled.div`
  font-size: 30px;
  margin: 0 10px;
  color: black;
  cursor: pointer;
`;
const PageDot = styled.div`
  margin: 0 5px;
`;
