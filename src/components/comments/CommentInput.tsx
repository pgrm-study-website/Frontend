import React, { useState } from 'react';
import { BsFillPencilFill } from 'react-icons/bs';
import styled from 'styled-components';

const CommentInput = ({ parentId }: { parentId: number | null }) => {
  const [input, setInput] = useState('');

  const createComment = () => {
    alert(`댓글 달기: "${input}"\n부모 댓글 Id: ${parentId || 'null'}`);
  };

  return (
    <Wrapper>
      <InputWrapper
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') createComment();
        }}
        placeholder="댓글을 입력하세요."
      />
      <InputWriteButton onClick={createComment}>
        <BsFillPencilFill />
      </InputWriteButton>
    </Wrapper>
  );
};

export default CommentInput;

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #f1f1f1;
  display: flex;
  margin: 5px 0;
`;
const InputWrapper = styled.input`
  width: calc(100% - 45px);
  height: 40px;
  border: 0;
  border-radius: 5px;
  background-color: #00000011;
  padding: 0 10px;
  font-size: 16px;
`;
const InputWriteButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
  background-color: #7c7c7c;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.15s linear;
  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
  &:hover {
    background-color: #525252;
  }
`;
