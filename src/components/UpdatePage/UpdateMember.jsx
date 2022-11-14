import React from 'react';
import styled from 'styled-components';
import logoImage from '../../assets/img/Group8700.png';
import UpdateForm from './UpdateForm';

export default function UpdateMember() {
  return (
    <TitleContainer>
      <div>
        <TitleImg src={logoImage} alt={logoImage} />
        <TitleText>회원 정보 수정</TitleText>
      </div>
      <UpdateForm />
    </TitleContainer>
  )
}

const TitleContainer = styled.div`
  text-align: center;
`;

const TitleImg = styled.img``;

const TitleText = styled.div`
  font-size: 20px;
  font-weight: 700;
  padding-bottom: 18px;
`;

