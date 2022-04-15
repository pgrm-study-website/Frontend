import React, { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { changeField } from 'modules/posts/writePosts';
import styled from 'styled-components';

const Editor = ({ content }: { content: string }) => {
  const dispatch = useDispatch();

  const QuillRef = useRef<ReactQuill>();
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    input.addEventListener('change', async () => {
      const file = input.files![0];
      const formData = new FormData();
      formData.append('file', file);
      try {
        const result = await axios.post(
          process.env.REACT_APP_API_IMAGE!,
          formData,
        );
        const IMG_URL = result.data;
        const editor = QuillRef.current!.getEditor();
        const range = editor.getSelection();
        editor.insertEmbed(range!.index, 'image', IMG_URL);
      } catch (error) {
        console.log(error);
      }
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ color: [] }, { background: [] }],
          ['blockquote'],
          [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: { matchVisual: false },
    };
  }, []);
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
  margin-top: 40px;
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
