import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLike,
} from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { Checkbox, Dropdown } from 'antd';
import 'antd/dist/antd.min.css';
import { createTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import SuccessMark from '../../assets/img/SuccessMark.png';
import { useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  LoginUserToken,
  LoginRole,
  LoginUserId,
  LoginUserName,
} from '../../states/LoginState';

import { Organization } from '../../states/ChatState';
import BannerInfo from './BannerInfo';

function Banner(props) {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName);

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [likeHeart, setLikeHeart] = useState('true');
  const [checkAdopted, setCheckAdopted] = useState('true');

  const currUser = {
    id: loginUserId,
    image:
      'http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon',
    name: loginUserName,
  };
  const organization = useRecoilValue(Organization);
  // recoil로 얻어오기

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme2 = createTheme({
    overrides: {
      MuiPopover: {
        root: { height: '180px' },
        paper: {
          padding: '20px',
          borderRadius: '20px',
          height: '180px',
          border: '1px solid #D2D2D2',
        },
      },
    },
  });
  //   const likedRes = () => {
  //     console.log("좋아요 누름");
  //     axios.get('https://sjs.hana-umc.shop/posts/1')
  //     .then((res) => {
  //       let { data } = res;
  //       let { animalIdx, isLike } = data;

  //       console.log('animalIdx : ' + animalIdx);
  //       console.log('isLike : ' +isLike);
  //       setLikeHeart(isLike);
  //     })
  //     .catch((err) => {
  //       console.log(err);

  //     });
  //   }
  return (
    <RootBanner>
      <DetailTitle>동물 상세 정보</DetailTitle>
      <ContainerBanner>
        <Profile>
          <ProfileImg src={props.imgUrl} />
          <PetInfo>
            <PetName>
              {props.name} /{' '}
              <button
                onClick={handleClick}
                style={{
                  background: 'none',
                  border: 'none',
                  fontWeight: '700',
                }}
              >
                &nbsp;유행사
              </button>
              <createTheme theme={theme2}>
                <Popover
                  id='popover-with-anchor'
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                >
                  <GroupTitle>{props.organizationName}</GroupTitle>
                  <GroupInfo>{props.address}</GroupInfo>
                  <GroupInfo>{props.phoneNumber}</GroupInfo>
                </Popover>
              </createTheme>
            </PetName>

            <BannerInfo
              isOrganization={isRole}
              id={props.animalIdx}
              name={props.name}
              species={props.species}
              year={props.year}
              month={props.month}
              isGuessed={props.isGuessed}
              gender={props.gender}
              illness={props.illness}
              socialization={props.socialization}
              separation={props.separation}
              toilet={props.toilet}
              bark={props.bark}
              bite={props.bite}
            />
          </PetInfo>
        </Profile>
        <ProfileIcon>
          <IconSet>
            {props.isOrganization == 'PRIVATE' ? ( //입양희망자인 경우
              <>
                {likeHeart == 'false' ? (
                  <AiOutlineHeart size='22' />
                ) : (
                  <AiFillHeart size='22' />
                )}
                <Dropdown
                  overlay={
                    <Chat currUser={currUser} organization={organization} />
                  }
                  trigger={['click']}
                >
                  <FiMail
                    size='22'
                    style={{ marginLeft: '22px', color: 'black' }}
                  />
                </Dropdown>
              </>
            ) : null}
          </IconSet>
          {props.isAdopted == true ? ( //입양 되었을 때 마크 여부
            <img src={SuccessMark} style={{ width: '150px' }} />
          ) : null}
        </ProfileIcon>
      </ContainerBanner>
    </RootBanner>
  );
}

export default Banner;

const RootBanner = styled.section`
  width: 100%;
  height: 460px;
  background: #fbc22e;
  font-family: 'SpoqaHanSansNeo-Bold';
  padding: 5px 0px;
`;

const ContainerBanner = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  height: 82%;
  background-color: #ffffff;
  padding: 40px 100px;
`;

const Profile = styled.div`
  display: flex;
`;

const DetailTitle = styled.h3`
  font-weight: 700;
  margin: 25px 100px;
  color: white;
`;

const ProfileImg = styled.img`
  object-fit: cover;
  border-radius: 10px;
  padding-top: 7px;
  width: 275px;
  height: 275px;
`;

const PetInfo = styled.div`
  margin-left: 50px;
`;

const PetName = styled.h1`
  font-weight: 900;
  display: flex;
`;

const GroupTitle = styled.div`
  margin: 10px;
  color: #fbc22e;
  font-weight: 700;
`;

const GroupInfo = styled.div`
  margin: 3px 40px 10px 10px;
  color: #333333;
  font-size: 12px;
  font-weight: 700;
`;

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
