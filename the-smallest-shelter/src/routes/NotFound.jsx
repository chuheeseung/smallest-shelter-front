import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Banner from '../components/ListviewPage/Banner';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Banner />
      <TitleText>해당 페이지를 찾지 못했습니다.</TitleText>
      <MiddleText>주소가 잘못되었거나 더 이상 제공되지 않는 페이지입니다.</MiddleText>
      <RouteText onClick={() => {navigate('/')}}>메인 페이지로 이동</RouteText>
    </PageContainer>
  )
}

const PageContainer = styled.div`
  width: 100%;
`;

const TitleText = styled.div`
  margin-top: 64px;
  margin-bottom: 32px;
  margin-left: 20px;
  font-size: 30px;
  font-weight: bold;
`;

const MiddleText = styled.div`
  margin-left: 20px; 
  font-size: 24px;
  line-height: 1.6;
`;

const RouteText = styled.div`
  margin-left: 20px;
  font-size: 24px;
  line-height: 1.6;
  color: #FBC22E;
  cursor: pointer;
`;