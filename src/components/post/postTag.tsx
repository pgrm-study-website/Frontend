import React from 'react';
import styled from 'styled-components';

const styleList: {
  [key: string]: {
    backgroundColor: string;
  };
} = {
  React: {
    backgroundColor: '#51b9d5',
  },
  FrontEnd: {
    backgroundColor: '#13b5b5',
  },
  BackEnd: {
    backgroundColor: '#13b579',
  },
  'Node.js': {
    backgroundColor: '#bb9b26',
  },
  JavaScript: {
    backgroundColor: '#8f7721',
  },
  Designer: {
    backgroundColor: '#c93c76',
  },
  'UI/UX': {
    backgroundColor: '#933d95',
  },
  Python: {
    backgroundColor: '#176ab1',
  },
  Spring: {
    backgroundColor: '#44931c',
  },
  IOS: {
    backgroundColor: '#81807f',
  },
  Android: {
    backgroundColor: '#59ab00',
  },
  DeepLearning: {
    backgroundColor: '#8b3333',
  },
  Vue: {
    backgroundColor: '#5da159',
  },
};

interface propsType {
  tag: string;
}

const PostTag = ({ tag }: propsType) => {
  return <Wrapper style={styleList[tag]}>{`#${tag}`}</Wrapper>;
};

export default PostTag;

const Wrapper = styled.div`
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  padding: 5px;
  color: white;
  border-radius: 3px;
  margin: 2px;
`;
