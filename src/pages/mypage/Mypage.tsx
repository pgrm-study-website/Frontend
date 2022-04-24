import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { AiFillSetting, AiOutlineClose } from 'react-icons/ai';
import { BsGithub, BsPencil } from 'react-icons/bs';
import { postListItemType } from 'lib/api/posts';
import tagsToTagIds from 'lib/utils/tagsToTagIds';
import autoCompleteTag from 'lib/utils/autoCompleteTag';
import cleanApplyList from 'lib/utils/cleanApplyList';
import { RootState } from 'modules';
import {
  changeField,
  read as userRead,
  update as userUpdate,
} from 'modules/users';
import { initList, myList } from 'modules/posts/listPosts';
import styled from 'styled-components';

import PostTagA from 'components/posts/PostTagA';
import PostTagB from 'components/posts/PostTagB';
import PostItem from 'components/posts/PostItem';
import Loading from 'components/common/Loading';
import NotFound from 'components/common/NotFound';

const Mypage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, read, update, posts } = useSelector(
    ({ users, listPosts }: RootState) => ({
      user: users.user,
      read: users.read,
      update: users.update,
      posts: listPosts.posts,
    }),
  );
  const { nickname } = useParams();
  const [edit, setEdit] = useState<any>({ key: null, value: null });
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userRead({ data: nickname!, type: 'nickname' }));
    if (user && user.nickname == nickname) {
      dispatch(myList());
    }
    return () => {
      dispatch(
        changeField({
          key: 'read',
          value: {
            data: null,
            error: null,
          },
        }),
      );
      dispatch(initList());
    };
  }, []);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    if (read.data) {
      htmlTitle!.innerHTML = `Plming - ${read.data.nickname}`;
      if (user && user.id === read.data.id) {
        navigate(`/mypage/${read.data.nickname}`);
        dispatch(
          changeField({
            key: 'user',
            value: {
              id: read.data.id,
              nickname: read.data.nickname,
              image: read.data.image,
            },
          }),
        );
        try {
          localStorage.setItem(
            'user',
            JSON.stringify({
              id: read.data.id,
              nickname: read.data.nickname,
              image: read.data.image,
              social: read.data.social,
            }),
          );
        } catch (e) {
          console.log('localStorage is not working');
        }
      }
    }
    return () => {
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [read.data]);
  useEffect(() => {
    if (update) {
      dispatch(userRead({ data: user!.id, type: 'id' }));
      dispatch(
        changeField({
          key: 'update',
          value: null,
        }),
      );
    }
  }, [update]);

  const updateUserInfo = (key: string, value: any) => {
    if (key === 'nickname' && (value.length < 2 || value.length > 8)) {
      alert('닉네임을 2~8자로 설정해주세요.');
      return;
    }
    if (key === 'introduce' && value.length > 100) {
      alert('100자 이하로 입력해주세요.');
      return;
    }
    if (key === 'github' && value.length > 16) {
      alert('16자 이하로 입력해주세요.');
      return;
    }

    setEdit({ key: null, value: null });
    dispatch(
      userUpdate({
        id: read.data!.id,
        data: {
          nickname: read.data!.nickname,
          image: read.data!.image,
          introduce: read.data!.introduce,
          github: read.data!.github,
          tagIds: tagsToTagIds(read.data!.tagsList),
          [key]: key === 'tagIds' ? tagsToTagIds(value) : value,
        },
      }),
    );
  };
  const onChangeProfileImage = async (e: any) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    try {
      const result = await axios.post(
        process.env.REACT_APP_API_IMAGE!,
        formData,
        { withCredentials: true },
      );
      updateUserInfo('image', result.data);
    } catch (error) {
      alert('이미지 업로드 오류');
    }
  };
  const insertTag = (i: string) => {
    if (edit.value.length === 10) {
      alert('태그는 10개까지 가능합니다.');
      return;
    }
    if (edit.value.includes(i)) {
      alert('이미 있는 태그입니다.');
      return;
    }
    setEdit({ ...edit, value: [...edit.value, i] });
  };
  const removeTag = (i: string) => {
    setEdit({ ...edit, value: edit.value.filter((j: string) => i !== j) });
  };

  if (!read.data && !read.error) {
    return <Loading />;
  } else if (read.error || !read.data) {
    return <NotFound />;
  } else {
    return (
      <Wrapper>
        <PrivateSettingWrapper>
          {user && user.nickname == nickname && (
            <>
              <AiFillSetting />
              <Link to="/pwd_change">비밀번호 변경</Link>
              <div>/</div>
              <Link to="/signout">회원 탈퇴</Link>
            </>
          )}
        </PrivateSettingWrapper>
        <InfoWrapper>
          <InfoSmallWrapper1>
            {user && user.nickname == nickname ? (
              <>
                <ProfileImage
                  src={
                    read.data.image ||
                    require('assets/images/defaultProfile.png')
                  }
                  alt="profile"
                  onClick={() => {
                    document.getElementById('FileInput_Mypage')?.click();
                  }}
                />
                <FileInput
                  type="file"
                  id="FileInput_Mypage"
                  onChange={onChangeProfileImage}
                />
              </>
            ) : (
              <ProfileImage2
                src={
                  read.data.image || require('assets/images/defaultProfile.png')
                }
                alt="profile"
              />
            )}
            {edit.key !== 'nickname' ? (
              <NicknameEditWrapper>
                <Nickname>{read.data.nickname}</Nickname>
                {user && user.nickname == nickname && (
                  <PencilIcon
                    onClick={() =>
                      setEdit({ key: 'nickname', value: read.data!.nickname })
                    }
                  />
                )}
              </NicknameEditWrapper>
            ) : (
              <>
                <NicknameInput
                  value={edit.value}
                  onChange={e =>
                    setEdit({ ...edit, value: e.target.value.substring(0, 8) })
                  }
                />
                <SmallButtonWrapper>
                  <div onClick={() => updateUserInfo('nickname', edit.value)}>
                    확인
                  </div>
                  <div onClick={() => setEdit({ key: null, value: null })}>
                    취소
                  </div>
                </SmallButtonWrapper>
              </>
            )}
            {read.data.email && <Email>{read.data.email}</Email>}
          </InfoSmallWrapper1>
          <InfoSmallWrapper2>
            {edit.key !== 'introduce' ? (
              <>
                <IntroduceText>
                  Introduce
                  {user && user.nickname == nickname && (
                    <PencilIcon
                      onClick={() =>
                        setEdit({
                          key: 'introduce',
                          value: read.data!.introduce,
                        })
                      }
                    />
                  )}
                </IntroduceText>
                <IntroduceEditWrapper>
                  <Introduce>
                    {!read.data.introduce || read.data.introduce === ''
                      ? '소개말이 없습니다.'
                      : read.data.introduce}
                  </Introduce>
                </IntroduceEditWrapper>
              </>
            ) : (
              <>
                <IntroduceInput
                  value={edit.value}
                  onChange={e =>
                    setEdit({
                      ...edit,
                      value: e.target.value.substring(0, 100),
                    })
                  }
                />
                <SmallButtonWrapper style={{ marginBottom: '15px' }}>
                  <div onClick={() => updateUserInfo('introduce', edit.value)}>
                    확인
                  </div>
                  <div onClick={() => setEdit({ key: null, value: null })}>
                    취소
                  </div>
                </SmallButtonWrapper>
              </>
            )}
            {edit.key !== 'github' ? (
              <GithubEditWrapper>
                <a
                  href={`https://github.com/${read.data.github}`}
                  target="_blank"
                >
                  <BsGithub />
                </a>
                <Github
                  href={`https://github.com/${read.data.github}`}
                  target="_blank"
                >
                  {!read.data.github || read.data.github === ''
                    ? 'Github 아이디가 없습니다.'
                    : read.data.github}
                </Github>
                {user && user.nickname == nickname && (
                  <PencilIcon
                    onClick={() =>
                      setEdit({ key: 'github', value: read.data!.github })
                    }
                  />
                )}
              </GithubEditWrapper>
            ) : (
              <>
                <GithubInput
                  value={edit.value}
                  onChange={e =>
                    setEdit({ ...edit, value: e.target.value.substring(0, 12) })
                  }
                />
                <SmallButtonWrapper>
                  <div onClick={() => updateUserInfo('github', edit.value)}>
                    확인
                  </div>
                  <div onClick={() => setEdit({ key: null, value: null })}>
                    취소
                  </div>
                </SmallButtonWrapper>
              </>
            )}
            {edit.key !== 'tagIds' && (
              <TagsEditWrapper>
                {!read.data.tagsList || read.data.tagsList.length === 0 ? (
                  <Tags>태그가 없습니다.</Tags>
                ) : (
                  <Tags>
                    {read.data.tagsList.map(i => (
                      <PostTagA key={i} tag={i} />
                    ))}
                  </Tags>
                )}
                {user && user.nickname == nickname && (
                  <PencilIcon
                    onClick={() => {
                      setEdit({ key: 'tagIds', value: read.data!.tagsList });
                      setTagInput('');
                    }}
                  />
                )}
              </TagsEditWrapper>
            )}
          </InfoSmallWrapper2>
        </InfoWrapper>
        {edit.key === 'tagIds' && (
          <TagPopUpBackground>
            <TagPopUpWrapper>
              <TagPopUpHeader>태그 (최대 10개)</TagPopUpHeader>
              <Tags>
                {edit.value.map((i: string) => (
                  <TagAItemWrapper key={i} onClick={() => removeTag(i)}>
                    <PostTagA tag={i} />
                  </TagAItemWrapper>
                ))}
              </Tags>
              <TagInput
                placeholder="ex) Frontend, Java, ..."
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
              />
              <AutoCompleteTagWrapper>
                {autoCompleteTag(edit.value, tagInput, 10).map(i => (
                  <TagBItemWrapper key={i} onClick={() => insertTag(i)}>
                    <PostTagB tag={i} />
                  </TagBItemWrapper>
                ))}
              </AutoCompleteTagWrapper>
              <SmallButtonWrapper>
                <div onClick={() => updateUserInfo('tagIds', edit.value)}>
                  확인
                </div>
                <div onClick={() => setEdit({ key: null, value: null })}>
                  취소
                </div>
              </SmallButtonWrapper>
            </TagPopUpWrapper>
          </TagPopUpBackground>
        )}

        {user && user.nickname !== nickname && (
          <MessageButton>메시지 보내기(본인은안보임)</MessageButton>
        )}

        {user && user.nickname === nickname && (
          <>
            <SmallText>작성한 글</SmallText>
            <PostListWrapper>
              {posts &&
                posts.write.map(
                  (i: postListItemType, idx: React.Key | null | undefined) => (
                    <PostItem key={idx} post={i} />
                  ),
                )}
              {posts && posts.write.length === 0 && (
                <NullPosts>작성한 글이 없습니다.</NullPosts>
              )}
            </PostListWrapper>
            <SmallText>댓글 단 글</SmallText>
            <PostListWrapper>
              {posts &&
                posts.comment.map(
                  (i: postListItemType, idx: React.Key | null | undefined) => (
                    <PostItem key={idx} post={i} />
                  ),
                )}
              {posts && posts.comment.length === 0 && (
                <NullPosts>댓글 단 글이 없습니다.</NullPosts>
              )}
            </PostListWrapper>
            <SmallText>신청한 글</SmallText>
            <PostListWrapper>
              {posts &&
                cleanApplyList(posts.apply, posts.write).map(
                  (i: postListItemType, idx: React.Key | null | undefined) => (
                    <PostItem key={idx} post={i} />
                  ),
                )}
              {posts &&
                cleanApplyList(posts.apply, posts.write).length === 0 && (
                  <NullPosts>신청한 글이 없습니다.</NullPosts>
                )}
            </PostListWrapper>
          </>
        )}
      </Wrapper>
    );
  }
};

export default Mypage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 35px 20px 95px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f9f9f9;
`;
const PrivateSettingWrapper = styled.div`
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin-bottom: 40px;
  svg {
    width: 20px;
    height: 20px;
    margin-top: -1px;
    margin-right: 2px;
  }
  div,
  a {
    margin: 0 3px;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 20px;
  justify-content: center;
  @media all and (max-width: 670px) {
    flex-direction: column;
    align-items: center;
  }
`;
const InfoSmallWrapper1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 410px;
  width: 30%;
  max-width: 360px;
  padding: 0 15px;
  @media all and (max-width: 670px) {
    width: 100%;
    height: 260px;
  }
`;
const InfoSmallWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 410px;
  width: 70%;
  max-width: 500px;
  padding: 0 15px;
  @media all and (max-width: 670px) {
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    margin-top: 30px;
  }
`;
const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  cursor: pointer;
  background-color: white;
  border: 3px solid #464646;
  &:hover {
    filter: contrast(30%);
  }
  margin-bottom: 20px;
`;
const ProfileImage2 = styled.img`
  width: 160px;
  height: 160px;
  background-color: white;
  border: 3px solid #464646;
  margin-bottom: 20px;
`;
const FileInput = styled.input`
  display: none;
`;
const NicknameEditWrapper = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 20px;
    height: 20px;
    margin: 0 0 -11px 7px;
  }
`;
const Nickname = styled.div`
  margin-top: 15px;
  font-size: 22px;
  font-family: NanumSquareR;
  margin-bottom: 5px;
`;
const NicknameInput = styled.input`
  margin-top: 0px;
  font-size: 22px;
  font-family: NanumSquareR;
  width: 200px;
  height: 40px;
  text-align: center;
`;
const Email = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-family: NanumSquareR;
`;
const IntroduceText = styled.div`
  font-size: 30px;
  font-family: NanumSquareR;
  svg {
    margin-left: 8px;
    width: 20px;
    height: 20px;
  }
`;
const IntroduceEditWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const Introduce = styled.div`
  width: 100%;
  word-break: break-all;
  line-height: 21px;
  font-size: 17px;
  font-family: NanumSquareR;
  text-align: center;
`;
const IntroduceInput = styled.textarea`
  width: 100%;
  max-width: 400px;
  height: 100px;
  margin-top: 10px;
  padding: 10px;
  font-size: 18px;
  font-family: NanumSquareR;
  word-break: break-all;
  resize: none;
`;
const GithubEditWrapper = styled.div`
  display: flex;
  align-items: center;
  svg:nth-child(1) {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  svg:nth-child(3) {
    width: 20px;
    height: 20px;
    margin: 0 0 0 10px;
  }
`;
const Github = styled.a`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: NanumSquareR;
`;
const GithubInput = styled.input`
  font-size: 20px;
  font-family: NanumSquareR;
  width: 200px;
  height: 36px;
  text-align: center;
`;
const TagsEditWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15px;
  svg {
    width: 20px;
    height: 20px;
  }
`;
const Tags = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const TagPopUpBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000000c1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 60;
`;
const TagPopUpWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  padding-bottom: 20px;
`;
const TagPopUpHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 25px;
  font-family: NanumSquareR;
  margin-top: 15px;
  margin-bottom: 15px;
`;
const TagInput = styled.input`
  margin-top: 10px;
  width: 200px;
  height: 40px;
  padding: 7px 5px 5px 5px;
  text-align: center;
  background-color: #d1d1d1;
  border: 0;
  border-bottom: 2px solid gray;
  border-radius: 3px;
  font-size: 20px;
  font-family: Roboto;
  &::placeholder {
    font-size: 16px;
  }
`;
const TagAItemWrapper = styled.div`
  cursor: pointer;
  transition: opacity 0.15s linear;
  &:hover {
    opacity: 0.6;
  }
`;
const TagBItemWrapper = styled.div`
  cursor: pointer;
  transition: opacity 0.15s linear;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
const AutoCompleteTagWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 142px;
  margin-bottom: 5px;
`;
const PencilIcon = styled(BsPencil)`
  width: 18px;
  height: 18px;
  color: #646464;
  margin-top: 5px;
  cursor: pointer;
  transition: color 0.15s linear;
  &:hover {
    color: #000000;
  }
`;
const SmallButtonWrapper = styled.div`
  margin-top: 6px;
  display: flex;
  color: white;
  font-size: 15px;
  div {
    padding: 5px 10px 4px 10px;
    border-radius: 4px;
    cursor: pointer;
  }
  div:nth-child(1) {
    background-color: #196c3a;
    margin-right: 8px;
  }
  div:nth-child(2) {
    background-color: #7c7c7c;
  }
`;
const SmallText = styled.div`
  margin-top: 80px;
  font-size: 28px;
  font-family: SuncheonR;
`;
const MessageButton = styled.div`
  margin: 50px 0;
  width: 120px;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000011;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.15s linear;
  &:hover {
    background-color: #00000033;
  }
`;
const PostListWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const NullPosts = styled.div`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-family: NanumSquareR;
  color: #464646;
  margin: 60px 0;
`;
