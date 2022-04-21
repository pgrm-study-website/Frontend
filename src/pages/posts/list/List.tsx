import React, { useState, useEffect, useReducer } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import qs from 'qs';
import { BiReset } from 'react-icons/bi';
import {
  BsSearch,
  BsPersonFill,
  BsFillCalendarWeekFill,
  BsFillPencilFill,
} from 'react-icons/bs';
import {
  tagList,
  fieldTagList,
  techTagList,
  languageTagList,
  etcTagList,
} from 'lib/utils/tagDatabase';
import {
  stateType,
  encodeQs,
  decodeQs,
  removeSearchOption,
} from 'lib/utils/postsQueryString';
import { RootState } from 'modules';
import { list } from 'modules/posts/listPosts';
import styled from 'styled-components';

import Error from 'components/common/Error';
import Loading from 'components/common/Loading';
import PostTagC from 'components/posts/PostTagC';
import SearchOption from 'components/posts/SearchOption';
import PostItem from 'components/posts/PostItem';

const List = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { posts, error, user } = useSelector(
    ({ listPosts, users }: RootState) => ({
      posts: listPosts.posts,
      error: listPosts.error,
      user: users.user,
    }),
  );

  const [foldOption, setFoldOption] = useState(false);
  const { searchState, page, showOptionText, showOption, pageArray, payload } =
    decodeQs(
      qs.parse(location.search, {
        ignoreQueryPrefix: true,
      }),
      12,
      posts ? posts.totalPages : 0,
    );
  const initialState: stateType = searchState;
  const reducer = (state: stateType, action: any) => {
    switch (action.name) {
      case 'searchType': {
        return { ...state, searchType: action.target.value };
      }
      case 'keyword': {
        return { ...state, keyword: action.target.value };
      }
      case 'category': {
        if (state.category.includes(action.value as string)) {
          return {
            ...state,
            category: state.category.filter(i => i !== action.value),
          };
        } else {
          return { ...state, category: [...state.category, action.value] };
        }
      }
      case 'status': {
        if (state.status.includes(action.value as string)) {
          return {
            ...state,
            status: state.status.filter(i => i !== action.value),
          };
        } else {
          return { ...state, status: [...state.status, action.value] };
        }
      }
      case 'tagIds': {
        if (state.tagIds.includes(action.value as number)) {
          return {
            ...state,
            tagIds: state.tagIds.filter(i => i !== action.value),
          };
        } else {
          if (state.tagIds.length === 5) {
            alert('태그는 5개까지만 검색 가능합니다.');
            return state;
          }
          return { ...state, tagIds: [...state.tagIds, action.value] };
        }
      }
      case 'participantMaxStart': {
        const newValue = Math.min(
          action.target.value as number,
          state.participantMax[1],
        );
        return {
          ...state,
          participantMax: [newValue, state.participantMax[1]],
        };
      }
      case 'participantMaxEnd': {
        const newValue = Math.max(
          action.target.value as number,
          state.participantMax[0],
        );
        return {
          ...state,
          participantMax: [state.participantMax[0], newValue],
        };
      }
      case 'periodStart': {
        const newValue = Math.min(
          action.target.value as number,
          state.period[1],
        );
        return {
          ...state,
          period: [newValue, state.period[1]],
        };
      }
      case 'periodEnd': {
        const newValue = Math.max(
          action.target.value as number,
          state.period[0],
        );
        return {
          ...state,
          period: [state.period[0], newValue],
        };
      }
      case 'reset': {
        return {
          searchType: '제목+내용',
          keyword: '',
          category: [],
          status: [],
          tagIds: [],
          period: [1, 24],
          participantMax: [2, 12],
        };
      }
      case 'revert': {
        return {
          ...state,
          category: initialState.category,
          status: initialState.status,
          tagIds: initialState.tagIds,
          period: initialState.period,
          participantMax: initialState.participantMax,
        };
      }
      case 'init': {
        return action.value as stateType;
      }
      default:
        return state;
    }
  };
  const [state, stateDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle!.innerHTML = 'Plming - List';
    window.scrollTo(0, 0);

    setFoldOption(false);
    stateDispatch({ name: 'init', value: searchState });
    dispatch(list(payload));

    return () => {
      htmlTitle!.innerHTML = 'Plming';
    };
  }, [dispatch, location.search, navigate]);

  const onSearch = () => {
    navigate(`/posts${encodeQs(state, page)}`);
  };
  const onRemoveOption = (x: string) => {
    navigate(`/posts${encodeQs(removeSearchOption(x, state), page)}`);
  };

  if (error) {
    return <Error />;
  } else if (!posts) {
    return <Loading />;
  }
  return (
    <Wrapper>
      <HeaderWrapper>
        <MessageText to="/posts">게시글 목록</MessageText>
        <SearchWrapper>
          <SearchType
            defaultValue={state.searchType}
            onChange={e => stateDispatch({ ...e, name: 'searchType' })}
          >
            <option>제목+내용</option>
            <option>제목만</option>
            <option>내용만</option>
          </SearchType>
          <SearchInput
            value={state.keyword}
            onChange={e => stateDispatch({ ...e, name: 'keyword' })}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                onSearch();
              }
            }}
            placeholder="Search"
          />
          <BsSearch onClick={onSearch} />
        </SearchWrapper>
      </HeaderWrapper>
      <OptionWrapper>
        <SummaryButtonWrapper>
          {user ? (
            <SummaryWrite to="/posts/write">
              <BsFillPencilFill /> <div>글쓰기</div>
            </SummaryWrite>
          ) : (
            <div />
          )}
          <SummaryButton onClick={() => setFoldOption(!foldOption)}>
            <div>검색 옵션</div>
            <div>{foldOption ? '▼' : '◀'}</div>
          </SummaryButton>
        </SummaryButtonWrapper>
        {foldOption && (
          <OptionsWrapper>
            <OptionChoiceWrapper>
              {['스터디', '프로젝트', '공모전', '기타'].map(i => (
                <OptionChoice
                  key={i}
                  onClick={() => stateDispatch({ name: 'category', value: i })}
                >
                  <OptionCheckbox
                    type="checkbox"
                    checked={state.category.includes(i)}
                    readOnly
                  />
                  {i}
                </OptionChoice>
              ))}
            </OptionChoiceWrapper>
            <OptionChoiceWrapper>
              {['모집 중', '모집 완료'].map(i => (
                <OptionChoice
                  key={i}
                  onClick={() => stateDispatch({ name: 'status', value: i })}
                >
                  <OptionCheckbox
                    type="checkbox"
                    checked={state.status.includes(i)}
                    readOnly
                  />
                  {i}
                </OptionChoice>
              ))}
            </OptionChoiceWrapper>
            <TagSearchWrapper>
              <TagColumnWrapper>
                <TagColumnText>Field</TagColumnText>
                <TagColumnBox>
                  {fieldTagList.map((i: number) => (
                    <div
                      key={i}
                      onClick={() =>
                        stateDispatch({ name: 'tagIds', value: i })
                      }
                    >
                      <PostTagC
                        tag={tagList[i]}
                        on={state.tagIds.includes(i) ? 'true' : 'false'}
                      />
                    </div>
                  ))}
                </TagColumnBox>
              </TagColumnWrapper>
              <TagColumnWrapper>
                <TagColumnText>Tech</TagColumnText>
                <TagColumnBox>
                  {techTagList.map((i: number) => (
                    <div
                      key={i}
                      onClick={() =>
                        stateDispatch({ name: 'tagIds', value: i })
                      }
                    >
                      <PostTagC
                        tag={tagList[i]}
                        on={state.tagIds.includes(i) ? 'true' : 'false'}
                      />
                    </div>
                  ))}
                </TagColumnBox>
              </TagColumnWrapper>
              <TagColumnWrapper>
                <TagColumnText>Language</TagColumnText>
                <TagColumnBox>
                  {languageTagList.map((i: number) => (
                    <div
                      key={i}
                      onClick={() =>
                        stateDispatch({ name: 'tagIds', value: i })
                      }
                    >
                      <PostTagC
                        tag={tagList[i]}
                        on={state.tagIds.includes(i) ? 'true' : 'false'}
                      />
                    </div>
                  ))}
                </TagColumnBox>
              </TagColumnWrapper>
              <TagColumnWrapper>
                <TagColumnText>Etc</TagColumnText>
                <TagColumnBox>
                  {etcTagList.map((i: number) => (
                    <div
                      key={i}
                      onClick={() =>
                        stateDispatch({ name: 'tagIds', value: i })
                      }
                    >
                      <PostTagC
                        tag={tagList[i]}
                        on={state.tagIds.includes(i) ? 'true' : 'false'}
                      />
                    </div>
                  ))}
                </TagColumnBox>
              </TagColumnWrapper>
            </TagSearchWrapper>
            <SlidersWrapper>
              <SliderItemWrapper>
                <SliderTitle>
                  <BsPersonFill />
                  {`최대 인원 ${state.participantMax[0]} ~ ${state.participantMax[1]}명`}
                </SliderTitle>
                <SliderWrapper>
                  <RealThumb
                    style={{
                      left: `calc(calc(calc(100% - 20px) * ${
                        (state.participantMax[0] - 2) / 10
                      }) - 10px)`,
                    }}
                  />
                  <RealThumb
                    style={{
                      left: `calc(calc(calc(100% - 20px) * ${
                        (state.participantMax[1] - 2) / 10
                      }) + 10px)`,
                    }}
                  />
                  <RealSliderRange />
                  <VolumeSlider
                    type="range"
                    min={2}
                    max={12}
                    value={state.participantMax[0]}
                    onChange={e =>
                      stateDispatch({ ...e, name: 'participantMaxStart' })
                    }
                    style={{ left: '-10px' }}
                  />
                  <VolumeSlider
                    type="range"
                    min={2}
                    max={12}
                    value={state.participantMax[1]}
                    onChange={e =>
                      stateDispatch({ ...e, name: 'participantMaxEnd' })
                    }
                    style={{ left: '10px' }}
                  />
                </SliderWrapper>
              </SliderItemWrapper>
              <SliderItemWrapper>
                <SliderTitle>
                  <BsFillCalendarWeekFill />
                  {`예상 기간 ${state.period[0]} ~ ${state.period[1]}주${
                    state.period[1] === 24 ? ' 이상' : ''
                  }`}
                </SliderTitle>
                <SliderWrapper>
                  <RealThumb
                    style={{
                      left: `calc(calc(calc(100% - 20px) * ${
                        (state.period[0] - 1) / 23
                      }) - 10px)`,
                    }}
                  />
                  <RealThumb
                    style={{
                      left: `calc(calc(calc(100% - 20px) * ${
                        (state.period[1] - 1) / 23
                      }) + 10px)`,
                    }}
                  />
                  <RealSliderRange />
                  <VolumeSlider
                    type="range"
                    min={1}
                    max={24}
                    value={state.period[0]}
                    onChange={e => stateDispatch({ ...e, name: 'periodStart' })}
                    style={{ left: '-10px' }}
                  />
                  <VolumeSlider
                    type="range"
                    min={1}
                    max={24}
                    value={state.period[1]}
                    onChange={e => stateDispatch({ ...e, name: 'periodEnd' })}
                    style={{ left: '10px' }}
                  />
                </SliderWrapper>
              </SliderItemWrapper>
            </SlidersWrapper>
            <OptionFooter>
              <BiReset onClick={() => stateDispatch({ name: 'reset' })} />
              <OptionFooterButtonWrapper>
                <div onClick={onSearch}>검색</div>
                <div
                  onClick={() => {
                    stateDispatch({ name: 'revert' });
                    setFoldOption(false);
                  }}
                >
                  취소
                </div>
              </OptionFooterButtonWrapper>
            </OptionFooter>
          </OptionsWrapper>
        )}
      </OptionWrapper>
      <ShowOptionWrapper>
        {/* <ShowOptionText>{showOptionText}</ShowOptionText> */}
        <ShowOptionList>
          {showOption.map((i, idx) => (
            <div key={idx} onClick={() => onRemoveOption(i)}>
              <SearchOption name={i} />
            </div>
          ))}
        </ShowOptionList>
      </ShowOptionWrapper>
      <PostListWrapperWrapper>
        {posts.content.length > 0 ? (
          <PostListWrapper>
            {posts.content.map((i, idx) => (
              <PostItem key={idx} post={i} />
            ))}
          </PostListWrapper>
        ) : (
          <PostNotFound>게시글이 없습니다.</PostNotFound>
        )}
      </PostListWrapperWrapper>
      <PageMoveWrapper>
        {pageArray.map(i => (
          <PageLargeNumber to={`/posts${encodeQs(state, i)}`} key={i}>
            {i}
          </PageLargeNumber>
        ))}
      </PageMoveWrapper>
    </Wrapper>
  );
};

export default List;

const Wrapper = styled.div`
  background-color: #e2e2e2;
  width: 100%;
  height: 100%;
  min-height: 800px;
  padding: 35px 20px 30px 20px;

  @media all and (max-width: 500px) {
    padding: 30px 15px 30px 15px;
  }
  @media all and (max-width: 400px) {
    padding: 30px 10px 30px 10px;
  }

  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
`;
const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const MessageText = styled(Link)`
  font-size: 30px;
  font-family: SuncheonR;
`;
const SearchWrapper = styled.div`
  width: 100%;
  max-width: 340px;
  margin-bottom: 10px;
  display: flex;
  svg {
    min-width: 30px;
    height: 30px;
    margin-left: 7px;
    cursor: pointer;
    color: #343434;
  }
  @media all and (max-width: 570px) {
    max-width: 100%;
    margin-top: 20px;
  }
`;
const SearchType = styled.select`
  margin-right: 10px;
  border-radius: 5px;
  border: 2.5px solid #545454;
  background-color: #f1f1f1;
  @media all and (max-width: 450px) {
    margin-right: 4px;
  }
`;
const SearchInput = styled.input`
  width: 100%;
  height: 30px;
  border: 2.5px solid #545454;
  border-radius: 5px;
  padding: 0 5px;
  background-color: #e1e1e1;
`;
const OptionWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 10px;
  border-bottom: 1px solid gray;
`;
const SummaryButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  font-family: NanumSquareR;
`;
const SummaryButton = styled.div`
  display: flex;
  cursor: pointer;
  color: #5c5c5c;
  div + div {
    margin-left: 5px;
  }
`;
const SummaryWrite = styled(Link)`
  display: flex;
  svg {
    margin: 0 5px -4px 0;
  }
  color: #555555;
  transition: color 0.15s linear;
  &:hover {
    color: #000000;
  }
`;
const OptionsWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  background-color: #ffffff77;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const OptionChoiceWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid grey;
  margin-bottom: 20px;
`;
const OptionChoice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: NanumSquareR;
  font-size: 18px;
  margin: 7.5px;
  cursor: pointer;
`;
const OptionCheckbox = styled.input`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
const SlidersWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 75px;
  padding-bottom: 50px;
  border-bottom: 1px solid gray;
  margin-top: 15px;
`;
const SliderItemWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SliderTitle = styled.div`
  font-size: 20px;
  font-family: NanumSquareR;
  margin-bottom: 20px;
  svg {
    width: 18px;
    height: 18px;
    margin: 0 6px -3px 0;
  }
`;
const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
`;
const RealThumb = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  background-color: #24777c;
  top: -7.5px;
  left: 0;
  z-index: 3;
  border-radius: 10px;
`;
const RealSliderRange = styled.div`
  width: 100%;
  height: 5px;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 5px;
  background-color: #646464;
`;
const VolumeSlider = styled.input`
  -webkit-appearance: none;
  position: absolute;
  width: 100%;
  height: 5px;
  top: 0;
  left: 0;
  opacity: 0;
  background-color: #484848;
  border-radius: 5px;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    pointer-events: all;
    background-color: #646464;
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
  z-index: 10;
  pointer-events: none;
  -webkit-appearance: none;
`;
const TagSearchWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 40px;
  padding-bottom: 45px;
  border-bottom: 1px solid gray;
  margin-bottom: 20px;
`;
const TagColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 180px;
  height: 240px;
`;
const TagColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: auto;
  padding: 5px;
  border-radius: 5px;
  &::-webkit-scrollbar {
    width: 13px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #9c9c9c;
    border-radius: 10px;
    background-clip: padding-box;
    border: 2px solid transparent;
  }
  &::-webkit-scrollbar-track {
    background-color: #e1e1e1;
    border-radius: 10px;
    box-shadow: inset 0px 0px 5px white;
  }
`;
const TagColumnText = styled.div`
  font-size: 24px;
  font-family: 'Anek Tamil', sans-serif;
  text-align: center;
  margin-bottom: 8px;
`;
const OptionFooter = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
const OptionFooterButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 18px;
    font-family: NanumSquareR;
    margin-left: 15px;
    cursor: pointer;
  }
`;
const ShowOptionWrapper = styled.div`
  width: 100%;
`;
const ShowOptionText = styled.div`
  font-size: 18px;
  font-family: NanumSquareR;
`;
const ShowOptionList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
`;
const PostListWrapperWrapper = styled.div`
  width: 100%;
  min-height: 630px;
`;
const PostListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;
const PostNotFound = styled.div`
  width: 100%;
  height: 630px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-family: SuncheonR;
`;
const PageMoveWrapper = styled.div`
  margin: 25px 0 30px 0;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageLargeNumber = styled(Link)`
  font-size: 30px;
  margin: 0 10px;
  color: black;
  cursor: pointer;
`;
