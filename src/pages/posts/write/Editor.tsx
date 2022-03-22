import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { changeField } from 'modules/posts/writePosts';

const Editor = ({ content }: { content: string }) => {
  const dispatch = useDispatch();

  const QuillRef = useRef<ReactQuill>();
  const modules = {
    toolbar: {
      container: [
        [{ size: ['small', false, 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ color: [] }, { background: [] }],
        ['blockquote'],
        [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
        ['link', 'image'],
        ['clean'],
      ],
    },
    clipboard: { matchVisual: false },
  };
  const formats = [
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'blockquote',
    'align',
    'list',
    'link',
    'image',
  ];

  return (
    <Wrapper>
      <NameText>본문</NameText>
      <QuillWrapper>
        <ReactQuill
          value={content}
          onChange={e => dispatch(changeField({ key: 'content', value: e }))}
          ref={element => {
            if (element !== null) {
              QuillRef.current = element;
            }
          }}
          modules={modules}
          formats={formats}
          theme="snow"
        />
      </QuillWrapper>
    </Wrapper>
  );
};

export default Editor;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
`;
const NameText = styled.div`
  font-size: 30px;
  font-family: LeeSeoyun;
  margin-bottom: 10px;
`;
const QuillWrapper = styled.div`
  background-color: white;
  .ql-editor {
    padding: 20px 15px 20px 15px;
    min-height: 450px;
    max-height: 550px;
  }
`;
