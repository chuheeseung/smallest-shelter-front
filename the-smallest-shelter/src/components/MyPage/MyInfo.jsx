//개인정보 패널 컴포넌트
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import user1 from '../../assets/img/ProfileImg/Ellipse 67.png';
import axios from 'axios';

function MyInfo(props) {
  console.log();
  return (
    <>
      {props.isRole == 'ORGANIZATION' ? (
        <MyInfoTitle>단체 정보</MyInfoTitle>
      ) : (
        <MyInfoTitle>개인 정보</MyInfoTitle>
      )}
      <MyInfoProfile>
        <ProfileTitle>프로필 사진</ProfileTitle>
        <ProfileImg src={props.profileImgUrl}></ProfileImg>
      </MyInfoProfile>
      <MyInfoDetail>
        {props.isRole == 'ORGANIZATION' ? (
          <ProfileTitle>단체 상세정보</ProfileTitle>
        ) : (
          <ProfileTitle>개인 상세정보</ProfileTitle>
        )}
        <DetailInfo>
          <ListItem>
            {props.isRole == 'ORGANIZATION' ? (
              <>
                <div>단체 이름</div>
                <div>전화번호</div>
                <div>주소</div>
                <div>이메일</div>
              </>
            ) : (
              <>
                <div>이름</div>
                <div>전화번호</div>
                <div>주소</div>
                <div>이메일</div>
              </>
            )}
          </ListItem>
          <ListUserInfo>
            <div>{props.name}</div>
            <div>{props.phoneNumber}</div>
            <div>{props.address}</div>
            <div>{props.email}</div>
          </ListUserInfo>
        </DetailInfo>
      </MyInfoDetail>
    </>
  );
}

const MyInfoTitle = styled.div`
  font-weight: bold;
  padding: 10px 5px 20px 20px;
  border-bottom: 1px solid white;
  font-size: 15px;
  font-family: 'SpoqaHanSansNeo-Medium';
`;

const MyInfoProfile = styled.div`
  display: flex;
  padding: 20px;
  border-bottom: 1px solid white;
`;

const ProfileTitle = styled.div`
  font-weight: bold;
  font-size: 15px;
`;

const ProfileImg = styled.img`
  width: 150px;
  margin: 15px 0px 0px 150px;
`;

const MyInfoDetail = styled.div`
  padding: 20px;
  display: flex;
`;

const DetailInfo = styled.div`
  display: flex;
  margin-left: 150px;
  margin-top: 10px;
`;

const ListItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  font-weight: bold;
`;

const ListUserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  font-weight: bold;
  margin-left: 50px;
`;

export default MyInfo;
