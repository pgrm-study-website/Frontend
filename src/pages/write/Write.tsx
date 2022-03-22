import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules';
import { initWrite } from 'modules/post/writePosts';

import Banner from './Banner';
import Title from './Title';
import Category from './Category';
import Editor from './Editor';
import Tags from './Tags';
import WriteButton from './WriteButton';

const Write = () => {
  const { post, result, loading } = useSelector(
    ({ writePosts, loading }: RootState) => ({
      post: writePosts.post,
      result: writePosts.result,
      loading: loading['writePost/WRITE'] || loading['writePost/UPDATE'],
    }),
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(initWrite());
    };
  }, [dispatch]);
  useEffect(() => {
    if (result) {
      navigate(`/project/read/${result}`);
    }
  }, [navigate, result]);

  return (
    <Wrapper>
      <Banner isNewPost={post.postId === null} />
      <Title title={post.title} />
      <Category category={post.category} />
      <Editor content={post.content} />
      <Tags tags={post.tags} />
      <WriteButton post={post} loading={loading} />
    </Wrapper>
  );
};

export default Write;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 50px 20px 70px 20px;
`;
