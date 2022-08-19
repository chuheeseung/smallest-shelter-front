import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { Checkbox, Dropdown } from 'antd';
import 'antd/dist/antd.min.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  LoginUserToken,
  LoginRole,
  LoginUserId,
  LoginUserName,
} from '../../states/LoginState';

function BannerInfo(props) {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName);

  const navigate = useNavigate();
  const [likeHeart, setLikeHeart] = useState('true');
  const [checkAdopted, setCheckAdopted] = useState('true');

  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(userToken, props.isRole);
    let checked = `${e.target.checked}`;
    setCheckAdopted(checked);
    console.log(checked);

    axios
      .patch(
        `https://sjs.hana-umc.shop/auth/organization/animal/adopt?animal_id=${props.id}`,
        {
          params: { animal_id: props.id },
          headers: { Authorization: userToken },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <PetParagraph>
      <InfoParagraph>
        <InfoItem1>동물종류</InfoItem1>
        <InfoItem1>성별</InfoItem1>
        <InfoItem1>질병</InfoItem1>
        <InfoItem1>나이</InfoItem1>
        {props.isOrganization == 'ORGANIZATION' ? ( //단체이면 입양상태 체크 가능
          <div style={{ marginTop: '19px' }}>
            <Checkbox onChange={onChange} />
          </div>
        ) : (
          <div style={{ marginTop: '19px' }}>
            <Checkbox onChange={onChange} />
          </div>
        )}
      </InfoParagraph>
      <InfoParagraph>
        <InfoItem2>
          {`${props.species}` == 'CAT' ? <>고양이</> : <>강아지</>}
        </InfoItem2>
        <InfoItem2>{`${props.gender}` == 'MALE' ? <>남</> : <>여</>}</InfoItem2>
        {props.illness.length != 0 ? (
          <InfoItem2>
            {props.illness.map((item) => {
              return <>{item.illnessName} &nbsp;</>;
            })}
          </InfoItem2>
        ) : (
          <InfoItem2>-</InfoItem2>
        )}

        <InfoItem2>
          {props.year}살 {props.month}개월{' '}
          {props.isGuessed == true ? '추정' : ''}
        </InfoItem2>
        {props.isOrganization == 'ORGANIZATION' ? (
          <InfoItem2>입양 상태</InfoItem2>
        ) : null}
      </InfoParagraph>
    </PetParagraph>
  );
}

export default BannerInfo;

const PetParagraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InfoParagraph = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
`;

const InfoItem1 = styled.div`
  margin-top: 20px;
`;

const InfoItem2 = styled.div`
  margin-top: 23px;
  font-weight: 700;
  font-size: 13px;
`;
const ProfileIcon = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
`;

const IconSet = styled.div`
  display: flex;
`;
