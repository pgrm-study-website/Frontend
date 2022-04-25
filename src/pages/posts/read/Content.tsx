import React from 'react';
import styled from 'styled-components';

const Content = ({ content }: { content: string }) => {
  return (
    <Wrapper>
      <ContentWrapper
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Wrapper>
  );
};

export default Content;

const Wrapper = styled.div`
  margin-top: 15px;
  width: 100%;
  border-radius: 10px;
  box-shadow: 5px 5px 20px #46464644;
  background-color: #e1e1e1;
`;
const ContentWrapper = styled.div`
  min-height: 400px;
  line-height: 1.5;
  padding: 30px 20px;
  * {
    cursor: default;
  }
  a {
    cursor: pointer;
  }
  img {
    cursor: default;
  }
  ul,
  ol {
    padding: 0;
  }
  li:not(.ql-direction-rtl)::before {
    width: 20px;
    padding: 0;
    margin-right: 8px;
  }
  overflow: hidden;
  img {
    max-width: 100%;
  }
`;
