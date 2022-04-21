import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules';
import { changeField, initWrite } from 'modules/posts/writePosts';
import styled from 'styled-components';

import Banner from './Banner';
import Title from './Title';
import Category from './Category';
import Editor from './Editor';
import Tags from './Tags';
import MoreInfo from './MoreInfo';
import WriteButton from './WriteButton';

const Write = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { post, result, loading, user } = useSelector(
    ({ writePosts, users, loading }: RootState) => ({
      post: writePosts.post,
      result: writePosts.result,
      loading: loading['writePosts/WRITE'] || loading['writePosts/UPDATE'],
      user: users.user,
    }),
  );

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - Write';
    window.scrollTo(0, 0);

    if (!user) {
      navigate('/posts');
      alert('로그인해야 글을 쓸 수 있습니다.');
    } else {
      if (post.status === '모집 완료') {
        navigate(`/posts/${post.id}`);
      } else if (post.userId && post.userId !== user.id) {
        navigate('/posts');
        alert('잘못된 접근입니다.');
      }
    }
    if (result) {
      navigate(`/posts/${result}`);
    }

    return () => {
      dispatch(initWrite());
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [dispatch, navigate, user, result]);

  return (
    <Wrapper>
      <Banner isNewPost={post.id === undefined} />
      <Title title={post.title} />
      <Category category={post.category} />
      <Editor content={post.content} />
      <Tags tagIds={post.tagIds} />
      <MoreInfo participantMax={post.participantMax} period={post.period} />
      <WriteButton post={post} loading={loading} />
    </Wrapper>
  );
};

export default Write;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 30px 20px 70px 20px;
  overflow: hidden;
`;
