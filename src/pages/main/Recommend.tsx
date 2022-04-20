import React, { useState, useEffect, useRef } from 'react';
import { postListItemType } from 'lib/api/posts';
import styled from 'styled-components';

import RecommendPostItem from './RecommendPostItem';
import { LoadingBox } from 'components/common/Loading';

const recommendMessage = [
  '조회수순',
  '임시 (그냥 최신순) 2',
  '임시 (그냥 최신순) 3',
];
const MAX_PAGE = 3;

const Recommend = ({ recommend }: { recommend: any }) => {
  const [page, setPage] = useState(0);
  const messageDiv = useRef<HTMLDivElement>(null);
  const postListDiv = useRef<HTMLDivElement>(null);

  let timer: NodeJS.Timeout | null = null;
  const changePage = () => {
    if (timer === null) {
      timer = setInterval(() => {
        setPage(page => (page + 1) % MAX_PAGE);
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
      {recommend ? (
        <>
          <MessageText ref={messageDiv}>{recommendMessage[page]}</MessageText>
          <PostListWrapper ref={postListDiv}>
            {recommend[page].map(
              (i: postListItemType, idx: React.Key | null | undefined) => (
                <RecommendPostItem key={idx} post={i} />
              ),
            )}
          </PostListWrapper>
        </>
      ) : (
        <LoadingBox r="70px" />
      )}
    </Wrapper>
  );
};

export default Recommend;

const Wrapper = styled.div`
  position: relative;
  background-color: #474747;
  width: 100%;
  min-height: 300px;
  padding: 25px 25px;
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
