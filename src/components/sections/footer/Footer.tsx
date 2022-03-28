import React from 'react';
import styled from 'styled-components';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Wrapper>
      <Title>Plming</Title>
      <Copyright>© 2022 Project Plming.</Copyright>

      <Icon>
        <a target="_blank" href="https://github.com/pgrm-study-website">
          <FaGithub />
        </a>
      </Icon>
    </Wrapper>
  );
};

export default Footer;

const Icon = styled.div`
  display: flex;
  position: absolute;
  right: 20px;
  bottom: 20px;
`;
const Title = styled.div`
  font-family: 'Bazzi';
  color: #fff;
  font-size: 20px;
  line-height: 30px;
`;
const Copyright = styled.div`
  font-family: 'KOTRAHOPE';
  font-size: 14px;
`;
const Wrapper = styled.div`
  color: #fff;
  padding: 20px;
  background-color: #474747;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
`;
