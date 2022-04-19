import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack, BiTrashAlt } from 'react-icons/bi';
import { RiBallPenLine } from 'react-icons/ri';
import { RootState } from 'modules';
import { initRead, read, remove as removePost } from 'modules/posts/readPosts';
import { setOriginal } from 'modules/posts/writePosts';
import readToEditPost from 'lib/utils/readToEditPost';
import styled from 'styled-components';

import Title from './Title';
import Info from './Info';
import Content from './Content';
import Tags from './Tags';
import Participant from './Participant';
import Comment from './Comment';
import MoreInfo from './MoreInfo';
import Loading from 'components/common/Loading';
import Error from 'components/common/Error';
import NotFound from 'components/common/NotFound';
import { initComment } from 'modules/posts/comments';

const Read = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();
  const { post, error, remove, user } = useSelector(
    ({ readPosts, loading, users }: RootState) => ({
      post: readPosts.post,
      error: readPosts.error,
      remove: readPosts.remove,
      loading: loading['readPosts/READ'],
      user: users.user,
    }),
  );

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(initRead());
    dispatch(initComment());
    dispatch(read(parseInt(id!)));
    return () => {
      dispatch(initRead());
      dispatch(initComment());
    };
  }, [dispatch]);

  useEffect(() => {
    if (remove) {
      navigate(`/posts`);
    }
  }, [navigate, remove]);

  const onEdit = () => {
    dispatch(setOriginal(readToEditPost(post!)));
    navigate('/posts/write');
  };
  const onDelete = () => {
    if (window.confirm('정말 이 글을 삭제하시겠습니까?')) {
      dispatch(removePost(parseInt(id!)));
    }
  };

  if (error) {
    if (error.response!.status === 404) return <NotFound />;
    else return <Error />;
  } else if (!post) {
    return <Loading />;
  } else {
    return (
      <Wrapper>
        <ListButton to="/posts">
          <BiArrowBack />
          List
        </ListButton>
        <Title title={post.title} />
        <Info
          userId={post.userId}
          viewCnt={post.viewCnt}
          createDate={post.createDate}
          updateDate={post.updateDate}
        />
        <Content content={post.content} />
        <MoreInfo participantMax={post.participantMax} period={post.period} />
        {/* <Participant participantNum={post.participantNum} /> */}
        <Tags tags={post.tags} />
        {user && post.userId === user.id && (
          <UtilButtonWrapper>
            <UtilButton className="EditButton" onClick={onEdit}>
              <RiBallPenLine />
              <UtilButtonText>Edit</UtilButtonText>
            </UtilButton>
            <UtilButton className="DeleteButton" onClick={onDelete}>
              <BiTrashAlt />
              <UtilButtonText>Delete</UtilButtonText>
            </UtilButton>
          </UtilButtonWrapper>
        )}
        <Comment id={post.id} />
      </Wrapper>
    );
  }
};

export default Read;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 50px 20px 70px 20px;
`;
const ListButton = styled(Link)`
  display: flex;
  align-items: center;
  margin-bottom: 50px;
  font-size: 24px;
  font-family: 'Press Start 2P', cursive;
  color: #9b9b9b;
  svg {
    width: 30px;
    height: 30px;
    margin: 0 10px 1.5px 0;
  }
  cursor: pointer;
  transition: all 0.2s linear;
  &:hover {
    color: black;
  }
`;
const UtilButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
const UtilButton = styled.div`
  width: 110px;
  height: 40px;
  border-radius: 10px;
  margin: 5px;
  padding: 0px 10px;
  background-color: #434343;
  color: white;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  svg {
    width: 21px;
    height: 21px;
  }
  &:hover > svg {
    animation: turn 1s ease-in-out;
  }
  &:hover {
    &.EditButton {
      background-color: #2c008f;
    }
    &.DeleteButton {
      background-color: #ac0202;
    }
  }
  @keyframes turn {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  @media all and (max-width: 400px) {
    width: 80px;
    svg {
      width: 15px;
      height: 15px;
    }
  }
  @media all and (max-width: 340px) {
    width: 60px;
    svg {
      width: 25px;
      height: 25px;
    }
  }
`;
const UtilButtonText = styled.div`
  font-size: 18px;
  font-family: 'Lato', sans-serif;
  @media all and (max-width: 400px) {
    font-size: 15px;
  }
  @media all and (max-width: 340px) {
    display: none;
  }
`;
