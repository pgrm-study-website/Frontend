import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { BsGithub, BsPencil } from 'react-icons/bs';
import { tagList } from 'lib/utils/tagDatabase';
import styled from 'styled-components';

import PostTagA from 'components/posts/PostTagA';
import PostItem from 'components/posts/PostItem';
import PostTagB from 'components/posts/PostTagB';

const testData = {
  nickname: '전승하abc12',
  email: 'seuha516@naver.com',
  image: 'image.com/123',
  tags: ['React', 'C++', 'Django', 'Spring', 'AI'],
  introduce:
    'Hello World! Hello World! Hello World! Hello World! Hello World! Hello World!',
  github: 'seuha516',
};
const testDataList = [
  {
    postId: 1,
    title: 'Node.js 스터디 같이 하실분~~',
    category: 1,
    tags: ['Node.js', 'JavaScript'],
    status: 1,
    participantNum: 5,
    participantMax: 6,
    period: 3,
    viewCount: 26,
  },
  {
    postId: 1,
    title: '포폴용 프로젝트 디자이너 구합니다.',
    category: 2,
    tags: ['Designer', 'UI/UX'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '공모전 앱 만드실 분??',
    category: 0,
    tags: ['FrontEnd', 'BackEnd'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
  {
    postId: 1,
    title: '웹프로젝트 처음부터 같이 만드실 분 모집중입니다!',
    category: 1,
    tags: ['FrontEnd', 'BackEnd', 'Designer', 'React', 'Spring'],
    status: 1,
    participantNum: 4,
    participantMax: 5,
    period: 4,
    viewCount: 126,
  },
];

const Mypage = () => {
  const { id } = useParams();
  const [edit, setEdit] = useState([false, false, false]);

  const [input, setInput] = useState('');
  const autoComplete = (x: string) => {
    if (x === '') return [];
    const result: string[] = [];
    for (let i = 0; i < tagList.length; i++) {
      const tagName = tagList[i];
      if (
        tagName.toLowerCase().includes(x.toLowerCase()) &&
        !testData.tags.includes(tagName)
      ) {
        result.push(tagName);
      }
    }
    return result;
  };

  useEffect(() => {
    //alert('userId: ' + id!.toString() + ' <- API 요청.. (미구현)');
  }, [id]);

  const onSetEdit = (x: number, y: boolean) => {
    setEdit(edit.map((i, idx) => (idx === x ? y : edit[idx])));
  };

  return (
    <Wrapper>
      <ProfileImage
        src={require('assets/images/defaultProfile.png')}
        alt="profile"
        onClick={() => {
          document.getElementById('FileInput_Mypage')?.click();
        }}
      />
      <FileInput type="file" id="FileInput_Mypage" />
      <Nickname>{testData.nickname}</Nickname>
      <Email>{testData.email}</Email>

      {edit[0] ? (
        <>
          <IntroduceInput defaultValue={testData.introduce} />
          <SmallButtonWrapper>
            <div onClick={() => onSetEdit(0, false)}>확인</div>
            <div onClick={() => onSetEdit(0, false)}>취소</div>
          </SmallButtonWrapper>
        </>
      ) : (
        <>
          <Introduce>{testData.introduce}</Introduce>
          <PencilIcon onClick={() => onSetEdit(0, true)} />
        </>
      )}

      <MessageButton>메시지 보내기(본인은안보임)</MessageButton>

      {edit[1] ? (
        <>
          <TagInput
            placeholder="ex) Frontend, Java, ..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <AutoCompleteTagWrapper>
            {autoComplete(input).map(i => (
              <TagBItemWrapper key={i}>
                <PostTagB tag={i} />
              </TagBItemWrapper>
            ))}
          </AutoCompleteTagWrapper>
          <SmallButtonWrapper>
            <div onClick={() => onSetEdit(1, false)}>확인</div>
            <div onClick={() => onSetEdit(1, false)}>취소</div>
          </SmallButtonWrapper>
        </>
      ) : (
        <>
          <Tags>
            {testData.tags.map(i => (
              <Link key={i} to={`/posts?tag=${i}`}>
                <PostTagA tag={i} />
              </Link>
            ))}
          </Tags>
          <PencilIcon onClick={() => onSetEdit(1, true)} />
        </>
      )}

      {edit[2] ? (
        <>
          <GithubInput placeholder="Github 아이디" />
          <SmallButtonWrapper>
            <div onClick={() => onSetEdit(2, false)}>확인</div>
            <div onClick={() => onSetEdit(2, false)}>취소</div>
          </SmallButtonWrapper>
        </>
      ) : (
        <>
          <Github
            href={`https://github.com/${testData.github}`}
            target="_blank"
          >
            <BsGithub />
            <div>{testData.github}</div>
          </Github>
          <PencilIcon onClick={() => onSetEdit(2, true)} />
        </>
      )}

      <SmallText>작성한 글</SmallText>
      <PostListWrapper>
        {testDataList.map((i, idx) => (
          <PostItem key={idx} post={i} />
        ))}
      </PostListWrapper>
      <SmallText>댓글 단 글 (본인만 보임)</SmallText>
      <PostListWrapper>
        {testDataList.map((i, idx) => (
          <PostItem key={idx} post={i} />
        ))}
      </PostListWrapper>
    </Wrapper>
  );
};

export default Mypage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 400px;
  padding: 85px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9;
`;
const ProfileImage = styled.img`
  width: 160px;
  height: 160px;
  cursor: pointer;
  &:hover {
    filter: contrast(30%);
  }
`;
const FileInput = styled.input`
  display: none;
`;
const Nickname = styled.div`
  margin-top: 15px;
  font-size: 22px;
  font-family: NanumSquareR;
`;
const Email = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-family: NanumSquareR;
`;
const Introduce = styled.div`
  margin-top: 50px;
  font-size: 17px;
  font-family: NanumSquareR;
  text-align: center;
`;
const Tags = styled.div`
  margin-top: 50px;
  display: flex;
`;
const Github = styled.a`
  margin-top: 24px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: NanumSquareR;
  svg {
    width: 32px;
    height: 32px;
    margin-right: 10px;
  }
`;
const SmallText = styled.div`
  margin-top: 80px;
  font-size: 28px;
  font-family: SuncheonR;
`;
const PostListWrapper = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const MessageButton = styled.div`
  margin: 50px 0 0 0;
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
const IntroduceInput = styled.textarea`
  width: 100%;
  max-width: 400px;
  height: 120px;
  margin-top: 50px;
  padding: 5px;
  font-size: 18px;
  font-family: NanumSquareR;
  word-break: break-all;
  resize: none;
`;
const TagInput = styled.input`
  margin-top: 50px;
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
const AutoCompleteTagWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  max-width: 400px;
  max-height: 142px;
`;
const TagBItemWrapper = styled.div`
  cursor: pointer;
  transition: opacity 0.15s linear;
  opacity: 0.4;
  &:hover {
    opacity: 1;
  }
`;
const GithubInput = styled.input`
  margin-top: 24px;
  height: 32px;
  padding: 5px;
  font-size: 18px;
  font-family: NanumSquareR;
  text-align: center;
`;
