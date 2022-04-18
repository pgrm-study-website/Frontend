import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from 'modules';
import { changeField, initWrite } from 'modules/posts/writePosts';

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

  const { post, user, result, loading } = useSelector(
    ({ writePosts, users, loading }: RootState) => ({
      post: writePosts.post,
      user: users.user,
      result: writePosts.result,
      loading: loading['writePosts/WRITE'] || loading['writePosts/UPDATE'],
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
      // if (post.userId && post.userId !== user.id) {
      //   navigate('/posts');
      //   alert('잘못된 접근입니다.');
      // } else {
      //   dispatch(changeField({ key: 'userId', value: user.id }));
      // }
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
      <Banner isNewPost={post.id !== null} />
      <Title title={post.title} />
      <Category category={post.category} />
      <Editor content={post.content} />
      <Tags tagIds={post.tagIds} />
      <MoreInfo participantMax={post.participantMax} period={post.period} />
      <WriteButton post={post} loading={loading} user={user!} />
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
