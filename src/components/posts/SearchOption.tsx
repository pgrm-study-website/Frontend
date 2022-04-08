import React from 'react';
import styled from 'styled-components';
import { styleList } from 'lib/utils/tagDatabase';

const SearchOption = ({ name }: { name: string }) => {
  return <Wrapper>{name}</Wrapper>;
};

export default SearchOption;

const Wrapper = styled.div`
  color: white;
  background-color: #363636;
  margin: 2px;
  padding: 5px 6px 5px 6px;
  font-size: 14px;
  border-radius: 5px;
`;
