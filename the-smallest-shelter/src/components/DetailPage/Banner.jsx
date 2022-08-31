import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  AiOutlineEdit,
  AiFillDelete,
  AiOutlineHeart,
  AiFillHeart,
} from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { Dropdown, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { createTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import SuccessMark from '../../assets/img/SuccessMark.png';
import Chat from '../Chat/Chat';
import { useNavigate } from 'react-router-dom';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  LoginUserToken,
  LoginRole,
  LoginUserId,
  LoginUserName,
  LoginImageIndex,
} from '../../states/LoginState';

import BannerInfo from './BannerInfo';
import { onValue, ref, remove, set } from 'firebase/database';
import { dbService } from '../../fbase';
import { imageArr } from '../SignUpPage/InputForm';

const { confirm } = Modal;

function Banner(props) {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName);
  const loginImageIndex = useRecoilValue(LoginImageIndex);

  const [anchorEl, setAnchorEl] = useState(null);
  const [likeHeart, setLikeHeart] = useState('false');
  const animalInfo = {
    animalIdx: String(props.animalIdx),
    animalName: props.name,
  };

  const messagesRef = ref(dbService, 'messages');

  const currUser = {
    id: loginUserId,
    image: imageArr[loginImageIndex],
    name: loginUserName,
  };

  const onEditInfo = () => {
    navigate(`/edit/${props.animalIdx}`);
  };

  const showConfirm = () => {
    confirm({
      title: '해당 동물 정보를 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '삭제 시 복구가 불가합니다.',

      onOk() {
        axios
          .delete(
            `https://sjs.hana-umc.shop/auth/organization/animal/${props.animalIdx}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          )
          .then(() => console.log('성공'))
          .catch((err) => console.log(err));

        onValue(messagesRef, (snapshot) => {
          if (snapshot.val() !== null) {
            Object.keys(snapshot.val()).map((id) => {
              id.includes(props.animalIdx) &&
                remove(ref(dbService, `messages/${id}/`));
            });
          } else {
            console.log('채팅방 없음');
            return;
          }
        });
        navigate('/');
        //window.location.href = "/";
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

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

  const onLike = async (e) => {
    let userIdx = props.userIdx;
    let animalId = props.animalIdx;
    let token = userToken;
    let liked = !likeHeart;
    console.log(token, liked);
    localStorage.setItem(`${userIdx}`, `${liked}`);
    await axios
      .patch(
        `https://sjs.hana-umc.shop/auth/private/animal/like?user_id=${userIdx}&animal_id=${animalId}`,
        {
          params: { user_id: userIdx, animal_id: animalId },
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        console.log(response);
        setLikeHeart(liked);
      });
  };
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
              {' '}
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
                {likeHeart == false ? (
                  <AiOutlineHeart size='22' onClick={onLike} />
                ) : (
                  <AiFillHeart size='22' onClick={onLike} />
                )}
                <Dropdown
                  overlay={
                    <Chat
                      currUser={currUser}
                      organization={props.organization}
                      animalInfo={animalInfo}
                    />
                  }
                  trigger={['click']}
                >
                  <FiMail
                    size='22'
                    style={{ marginLeft: '22px', color: 'black' }}
                  />
                </Dropdown>
              </>
            ) : (
              <>
                <AiOutlineEdit size='22' onClick={onEditInfo} />
                <AiFillDelete
                  size='22'
                  onClick={showConfirm}
                  style={{ marginLeft: '22px' }}
                />
              </>
            )}
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