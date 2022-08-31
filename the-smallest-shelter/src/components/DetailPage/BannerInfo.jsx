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
//이미지
import GOOD from '../../assets/img/perfect_off.png';
import TRAINING from '../../assets/img/practice_off.png';
import BAD from '../../assets/img/lack_off.png';

function BannerInfo(props) {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName);

  const navigate = useNavigate();
  const [likeHeart, setLikeHeart] = useState('true');
  const [checkAdopted, setCheckAdopted] = useState('true');

  const onChange = async (e) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(props.isOrganization, 'id:', props.id);
    let animalId = props.id;
    let checked = `${e.target.checked}`;
    let token = userToken;
    setCheckAdopted(checked);
    console.log(token);

    await axios
      .patch(
        `https://sjs.hana-umc.shop/auth/organization/animal/adopt?animal_id=${animalId}`,
        {
          params: { animal_id: animalId },
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <AnimalDetail>
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
          ) : null}
        </InfoParagraph>
        <InfoParagraph>
          <InfoItem2>
            {`${props.species}` == 'CAT' ? <>고양이</> : <>강아지</>}
          </InfoItem2>
          <InfoItem2>
            {`${props.gender}` == 'MALE' ? <>남</> : <>여</>}
          </InfoItem2>
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
      <PetParagraph>
        <InfoParagraph>
          <InfoItem1>사회화</InfoItem1>
          <InfoItem1>분리불안</InfoItem1>
          <InfoItem1>배변 훈련</InfoItem1>
          <InfoItem1>짖음</InfoItem1>
          <InfoItem1>입질</InfoItem1>
        </InfoParagraph>
        <InfoParagraph>
          <InfoItem2>
            {props.socialization == 'GOOD' ? (
              <StateImg src={GOOD} />
            ) : props.socialization == 'TRAINING' ? (
              <StateImg src={TRAINING} />
            ) : (
              <StateImg src={BAD} />
            )}
          </InfoItem2>
          <InfoItem2>
            {props.separation == 'GOOD' ? (
              <StateImg src={GOOD} />
            ) : props.separation == 'TRAINING' ? (
              <StateImg src={TRAINING} />
            ) : (
              <StateImg src={BAD} />
            )}
          </InfoItem2>
          <InfoItem2>
            {props.toilet == 'GOOD' ? (
              <StateImg src={GOOD} />
            ) : props.toilet == 'TRAINING' ? (
              <StateImg src={TRAINING} />
            ) : (
              <StateImg src={BAD} />
            )}
          </InfoItem2>
          <InfoItem2>
            {props.bark == 'GOOD' ? (
              <StateImg src={GOOD} />
            ) : props.bark == 'TRAINING' ? (
              <StateImg src={TRAINING} />
            ) : (
              <StateImg src={BAD} />
            )}
          </InfoItem2>
          <InfoItem2>
            {props.bite == 'GOOD' ? (
              <StateImg src={GOOD} />
            ) : props.bite == 'TRAINING' ? (
              <StateImg src={TRAINING} />
            ) : (
              <StateImg src={BAD} />
            )}
          </InfoItem2>
        </InfoParagraph>
      </PetParagraph>
    </AnimalDetail>
  );
}

export default BannerInfo;

const AnimalDetail = styled.div`
  display: flex;
  flex-direction: row;
`;

const PetParagraph = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  margin: 0px 30px;
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
  margin-top: 20px;
  margin-left: 20px;
  font-weight: 700;
  font-size: 13px;
`;

const StateImg = styled.img`
  width: 70px;
`;