import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import styled from 'styled-components';
import { Typography } from 'antd';
import axios from 'axios';
import {
  useRecoilState,
  // useRecoilValue,
} from 'recoil';
import {
  LoginUserIdx,
  LoginUserToken,
  LoginRole,
} from '../../states/LoginState';
import { imageArr } from '../SignUpPage/InputForm'; 

const { Paragraph } = Typography;

function MyInfo(props) {
  const nameData = `${props.name}`;
  const [editableName, setEditableName] = useState('');
  const [editablePhone, setEditablePhone] = useState('');
  const [editableAddress, setEditableAddress] = useState('');
  const [editableEmail, setEditableEmail] = useState('');
  const [editCheck, setEditCheck] = useState(false);

  const [token, setToken] = useRecoilState(LoginUserToken);
  const [userIdx, setUserIdx] = useRecoilState(LoginUserIdx);
  const [isRole, setIsRole] = useRecoilState(LoginRole);

  const handleEdit = () => {
    setEditCheck((check) => !check);
    console.log(editCheck);
    if (editCheck == true && isRole == 'PRIVATE') {
      const privateRes = axios
        .patch(
          `https://sjs.hana-umc.shop/auth/private/${userIdx}`,
          {
            data: {
              name: editableName,
              phoneNumber: editablePhone,
              address: editableAddress,
              email: editableEmail,
            },
          },
          { headers: { Authorization: `${token}` } }
        )
        .then((response) => {
          console.log(response);
        });
    } else if (editCheck == true && isRole == 'ORGANIZATION') {
      const organizationRes = axios
        .patch(
          `https://sjs.hana-umc.shop/auth/organization/${userIdx}`,
          {
            data: {
              name: editableName,
              phoneNumber: editablePhone,
              address: editableAddress,
              email: editableEmail,
            },
          },
          { headers: { Authorization: `${token}` } }
        )
        .then((response) => {
          console.log(response);
        });
    }
  };

  useEffect(() => {
    setEditableName(nameData);
    setEditablePhone(props.phoneNumber);
    setEditableAddress(props.address);
    setEditableEmail(props.email);
  }, [nameData, props.phoneNumber, props.address, props.email]);

  return (
    <>
      {props.isRole == 'ORGANIZATION' ? (
        <MyInfoTitle>단체 정보</MyInfoTitle>
      ) : (
        <MyInfoTitle>개인 정보</MyInfoTitle>
      )}
      <MyInfoProfile>
        <ProfileTitle>프로필 사진</ProfileTitle>
        <ProfileImg src={imageArr[props.profileImgUrl]}></ProfileImg>
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
          {editCheck ? (
            <ListUserInfo>
              <div>
                <Paragraph
                  editable={{
                    onChange: setEditableName,
                  }}
                >
                  {editableName}
                </Paragraph>
              </div>
              <div>
                <Paragraph
                  editable={{
                    onChange: setEditablePhone,
                  }}
                >
                  {editablePhone}
                </Paragraph>
              </div>
              <div>
                <Paragraph
                  editable={{
                    onChange: setEditableAddress,
                  }}
                >
                  {editableAddress}
                </Paragraph>
              </div>
              <div>
                <Paragraph
                  editable={{
                    onChange: setEditableEmail,
                  }}
                >
                  {editableEmail}
                </Paragraph>
              </div>
            </ListUserInfo>
          ) : (
            <ListUserInfo>
              <div>{editableName}</div>
              <div>{editablePhone}</div>
              <div>{editableAddress}</div>
              <div>{editableEmail}</div>
            </ListUserInfo>
          )}
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
