import React, { useRef } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const QuillWrapper = styled.div`
  background-color: white;
  .ql-editor {
    padding: 20px 15px 100px 15px;
    min-height: 420px;
    max-height: 550px;
  }
`;

const Editor = () => {
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
    <QuillWrapper>
      <ReactQuill
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
  );
};

export default Editor;
