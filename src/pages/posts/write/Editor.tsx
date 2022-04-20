import React, { useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import ReactQuill, { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import ImageResize from '@looop/quill-image-resize-module-react';
import 'react-quill/dist/quill.snow.css';
import { changeField } from 'modules/posts/writePosts';
import styled from 'styled-components';
Quill.register('modules/ImageUploader', ImageUploader);
Quill.register('modules/ImageResize', ImageResize);

const Editor = ({ content }: { content: string }) => {
  const dispatch = useDispatch();

  const QuillRef = useRef<ReactQuill>();
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
      },
      ImageUploader: {
        upload: async (file: any) => {
          const formData = new FormData();
          formData.append('file', file);
          try {
            const result = await axios.post(
              process.env.REACT_APP_API_IMAGE!,
              formData,
            );
            return result.data;
          } catch (error) {
            alert('이미지 업로드 오류');
          }
        },
      },
      ImageResize: {
        displayStyles: {
          backgroundColor: 'black',
          border: 'none',
          color: 'white',
        },
        modules: ['Resize', 'DisplaySize'],
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
    &::-webkit-scrollbar {
      width: 15px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #757575;
      background-clip: padding-box;
      border: 2px solid transparent;
      border-radius: 0;
    }
    &::-webkit-scrollbar-track {
      background-color: #b6b6b6;
      border-radius: 0;
    }
  }
`;
