import React from 'react';
import styled from 'styled-components';

const Banner = ({ isNewPost }: { isNewPost: boolean }) => {
  return (
    <Wrapper>
      <LargeText>{isNewPost ? 'Create New Team' : 'Edit Post'}</LargeText>
    </Wrapper>
  );
};

export default Banner;

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0 50px 0;
`;
const LargeText = styled.div`
  font-size: 70px;
  font-family: 'Hurricane', cursive;
`;
