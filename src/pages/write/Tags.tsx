import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { tagList } from 'lib/utils/tagDatabase';
import PostTagB from 'components/post/PostTagB';
import { changeField } from 'modules/post/writePosts';
import PostTagA from 'components/post/PostTagA';

const Tags = ({ tags }: { tags: string[] }) => {
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const autoComplete = (x: string) => {
    if (x === '') return [];
    const result: string[] = [];
    for (let i = 0; i < tagList.length; i++) {
      const tagName = tagList[i];
      if (tagName.toLowerCase().includes(x.toLowerCase())) {
        result.push(tagName);
      }
    }
    return result;
  };

  return (
    <Wrapper>
      <NameText>태그</NameText>
      {tags.length > 0 && (
        <TagBox>
          {tags.map(i => (
            <TagAItemWrapper
              key={i}
              onClick={() => {
                dispatch(
                  changeField({
                    key: 'tags',
                    value: tags.filter(j => i !== j),
                  }),
                );
              }}
            >
              <PostTagA tag={i} />
            </TagAItemWrapper>
          ))}
        </TagBox>
      )}
      <TagInput
        placeholder="ex) Frontend, Java, ..."
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <AutoCompleteTagWrapper>
        {autoComplete(input).map(i => (
          <TagBItemWrapper
            key={i}
            onClick={() => {
              if (tags.length === 5) {
                alert('태그는 5개까지 가능합니다.');
                return;
              }
              dispatch(changeField({ key: 'tags', value: [...tags, i] }));
            }}
          >
            <PostTagB tag={i} />
          </TagBItemWrapper>
        ))}
      </AutoCompleteTagWrapper>
    </Wrapper>
  );
};

export default Tags;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 12px;
`;
const TagBox = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  margin-bottom: 10px;
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
    opacity: 0.8;
  }
`;
const TagInput = styled.input`
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
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  max-height: 142px;
`;
