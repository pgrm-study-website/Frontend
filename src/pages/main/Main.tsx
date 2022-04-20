import React, { useEffect, useState } from 'react';
import { list } from 'lib/api/posts';

import Banner from './Banner';
import Recommend from './Recommend';
import PostList from './PostList';

const Main = () => {
  const [data, setData] = useState<any>({
    recommend: null,
    normalList: null,
  });

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadData = async () => {
      const recommend1 = await list('?page=0&size=4&searchType=viewCnt');
      const recommend2 = await list('?page=0&size=4&category=스터디');
      const recommend3 = await list('?page=0&size=4&category=프로젝트');
      const recommend4 = await list('?page=0&size=4&category=공모전');
      const normalList = await list('?page=0&size=6');
      setData({
        recommend: [
          recommend1.data.content,
          recommend2.data.content,
          recommend3.data.content,
          recommend4.data.content,
        ],
        normalList: normalList.data.content,
      });
    };
    void loadData();
  }, []);

  return (
    <>
      <Banner />
      <Recommend recommend={data.recommend} />
      <PostList normalList={data.normalList} />
    </>
  );
};

export default Main;
