import React, { useEffect } from 'react';

import Banner from './Banner';
import Recommend from './Recommend';
import PostList from './PostList';

const Main = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Banner />
      <Recommend />
      <PostList />
    </>
  );
};

export default Main;
