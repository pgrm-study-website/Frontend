import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiArrowBack } from 'react-icons/bi';
import styled from 'styled-components';
import { RootState } from 'modules';
import { initRead } from 'modules/posts/readPosts';

import Title from './Title';
import Info from './Info';
import Content from './Content';
import Tags from './Tags';
import Participant from './Participant';
import Comment from './Comment';
import MoreInfo from './MoreInfo';

const testDate = new Date();
const testPost = {
  postId: 26,
  userId: 13,
  title: 'Test 타이틀 예시 123',
  category: 1,
  tags: ['React', 'C++', 'Django', 'Spring', 'AI'],
  content:
    '<p><strong>Lorem Ipsum</strong>&nbsp;is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p><p><br></p><p><span class="ql-size-large">Lorem Ipsum</span></p><p><br></p><p><span class="ql-size-large">Lorem Ipsum</span></p><p><br></p><ul><li><span class="ql-cursor"></span>인증코드 발송</li></ul><ol><li>이메일로 인증 코드 발송 기능</li><li>이메일 인증 코드 확인 기능</li><li>아이디 중복 확인</li><li>닉네임 중복확인</li><li>회원가입 (새로운 회원 생성)</li></ol><ul><li>인증링크 발송</li></ul><ol><li>아이디 중복 확인</li><li>닉네임 중복 확인</li><li>회원가입(새로운 회원 생성 - 인증되지 않은 회원)</li><li>이메일로 인증 링크 발송</li></ol><ul><li>두 가지 방법 중 어떤 것을 채택할 지 논의 필요</li><li>소셜 로그인</li><li>이메일을 통해 회원가입을 한 후, 소셜 로그인을 연동하는지</li><li>소셜 로그인을 통해 처음 로그인하면, 회원가입 페이지로 이동하는지 결정해야 함</li></ul><p>🌝로그인</p><ol><li><strong>로그인 시 토큰(JWT) 반환 기능</strong></li></ol><ul><li><strong>소셜 로그인</strong>소셜 로그인 과정 스터디 이후, 상세한 기능 추가 예정</li><li><strong>자동 로그인 기능 (remember me)</strong>토큰을 활용한 방식으로 구현</li><li><strong>비밀번호 찾기</strong>이메일 인증</li><li>휴대폰 문자 인증</li></ul><p>🔔 알림창</p><ul><li>알림 종류: 쪽지, 본인 게시글 댓글, 본인 댓글의 대댓글</li></ul><ol><li><strong>알림 확인 기능</strong></li></ol><ul><li>알림창 화면이 사용자에게 보여질 때 실행됨</li><li>DB의 알림 테이블에서 사용자 ID로 조회하여 알림들 반환</li></ul><ol><li><strong>알림 삭제 기능</strong></li></ol><ul><li>Case 1: 알림 자동 삭제</li><li>알림 확인 시 서버에서 해당 알림 삭제</li><li>Case 2: 알림 확인 이후 기록을 남김</li><li>사용자가 명시적으로 알림을 삭제</li><li>이 경우 알림 삭제 버튼 필요</li></ul><p>💬 쪽지 관련 화면</p><ol><li><strong>쪽지 보내기</strong></li><li><strong>쪽지 확인</strong></li></ol><ul><li>쪽지 관련 화면에서 여러 사용자들과 쪽지를 주고 받은 리스트를 반환</li><li>이 경우, 가장 최근에 보낸 쪽지들을 리스트로 반환</li><li>한 사용자와 주고 받은 여러 쪽지들 리스트 반환</li><li>쪽지에서 페이징 처리하는지 논의 필요. 필자는 페이징 없이 모든 쪽지를 반환해주는 방식 추천</li></ul><p><br></p>',
  period: 3,
  status: 1,
  participantNum: 3,
  participantMax: 6,
  viewCount: 621,
  createDate: testDate,
  updateDate: testDate,
};

const Read = () => {
  const { post, error, remove } = useSelector(
    ({ readPosts, loading }: RootState) => ({
      post: readPosts.post,
      error: readPosts.error,
      remove: readPosts.remove,
      loading: loading['readPosts/READ'],
    }),
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      dispatch(initRead());
    };
  }, [dispatch]);

  useEffect(() => {
    if (remove) {
      navigate(`/posts`);
    }
  }, [navigate, remove]);

  return (
    <Wrapper>
      <ListButton to="/posts">
        <BiArrowBack />
        List
      </ListButton>
      <Title title={testPost.title} />
      <Info
        userId={testPost.userId}
        viewCount={testPost.viewCount}
        createDate={testPost.createDate}
        updateDate={testPost.updateDate}
      />
      <Content content={testPost.content} />
      <MoreInfo
        participantMax={testPost.participantMax}
        period={testPost.period}
      />
      <Participant
        participantNum={testPost.participantNum}
        participantMax={testPost.participantMax}
      />
      <Tags tags={testPost.tags} />
      <Comment />
    </Wrapper>
  );
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
