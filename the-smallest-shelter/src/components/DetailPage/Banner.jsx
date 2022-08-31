import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {
  AiOutlineStar,
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineLike,
  AiFillDelete,
  AiOutlineEdit,
} from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import { Checkbox, Dropdown, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import 'antd/dist/antd.min.css';
import { createTheme } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import SuccessMark from '../../assets/img/SuccessMark.png';
import { useNavigate } from 'react-router-dom';
import Chat from '../Chat/Chat';

import {
  useRecoilState, useRecoilValue,
} from 'recoil';
import { LoginUserToken, LoginRole, LoginUserId, LoginUserName } from '../../states/LoginState';
import { onValue, ref, remove, set } from 'firebase/database';
import { dbService } from '../../fbase';
const { confirm } = Modal;

function Banner(props) {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const loginUserId = useRecoilValue(LoginUserId);
  const loginUserName = useRecoilValue(LoginUserName)

  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [likeHeart, setLikeHeart] = useState("true");
  const [checkAdopted, setCheckAdopted] = useState("true");
  const animalInfo = { "animalIdx": String(props.animalIdx), "animalName": props.name }
  const messagesRef = ref(dbService, "messages");

  const currUser = {
    "id": loginUserId,
    "image": "http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon",
    "name": loginUserName
  };

  // const onChange = (e) => {
  //   console.log(`checked = ${e.target.checked}`);
  //   console.log(userToken, isRole);
  //   let checked = `${e.target.checked}`
  //   setCheckAdopted(checked);
  //   console.log(checked);

  //   // axios.patch(`https://sjs.hana-umc.shop/auth/organization/animal/adopt?animal_id=30`, {animal_id: 30})
  //   axios.patch('https://sjs.hana-umc.shop/auth/organization/animal/adopt?animal_id=30',
  //     {
  //       params: { animal_id: 30 },
  //       headers: { 'Authorization': userToken }
  //     }
  //     // headers: {
  //     //     // withCredentials: true,
  //     //     // 'Accept': 'application/json',
  //     //     'Authorization': userToken,
  //     // },
  //   ).then((response) => {
  //     console.log(response);
  //   });
  // }


  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const theme2 = createTheme({
    overrides: {
      MuiPopover: {
        root: {
        },
        paper: {
          padding: "20px",
          borderRadius: "20px",
          height: "120px",
          border: "1px solid #D2D2D2",

        }
      }
    }
  });

  const onChange = async (e) => {
    console.log(`checked = ${e.target.checked}`);
    console.log(
      props.isOrganization,
      'user id:',
      props.userIdx,
      'animal id: ',
      props.animalIdx
    );
    let userId = props.userIdx;
    let animalId = props.animalIdx;
    let checked = `${e.target.checked}`;
    let token = userToken;
    setCheckAdopted(checked);
    console.log(token);

    await axios
      .patch(
        `https://sjs.hana-umc.shop/auth/private/animal/like?user_id=${userId}&animal_id=${animalId}`,
        {
          params: { user_id: `${userId}`, animal_id: `${animalId}` },
        },
        { headers: { Authorization: `${token}` } }
      )
      .then((response) => {
        console.log(response);
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

  const onEditInfo = () => {
    navigate(`/edit/${props.animalIdx}`)
  }
  const showConfirm = () => {
    confirm({
      title: '해당 동물 정보를 삭제하시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '삭제 시 복구가 불가합니다.',

      onOk() {
        axios.delete(`https://sjs.hana-umc.shop/auth/organization/animal/${props.animalIdx}`, {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        })
          .then(() => console.log("성공"))
          .catch((err) => console.log(err))

          onValue(messagesRef, (snapshot) => {
            if (snapshot.val() !== null) {
              Object.keys(snapshot.val()).map(id => {
                id.includes(props.animalIdx) 
                && remove(ref(dbService,`messages/${id}/`))
              })
            } else {console.log("채팅방 없음"); return}
          })
          navigate('/')
          //window.location.href = "/";
        },
        onCancel() {
          console.log('Cancel');
        },
      });
  };

  return (
    <RootBanner>
      <DetailTitle>동물 상세 정보</DetailTitle>
      <ContainerBanner>
        <Profile>
          <ProfileImg src={props.imgUrl} />
          <PetInfo>
            <PetName> {props.name} / <button onClick={handleClick} style={{ background: "none", border: "none", fontWeight: "700", }}>&nbsp;유행사</button>
              <createTheme theme={theme2}>
                <Popover
                  id="popover-with-anchor"
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                >
                  <GroupTitle>{props.organizationName}</GroupTitle>
                  <GroupInfo>{props.address}</GroupInfo>
                  <GroupInfo>{props.phoneNumber}</GroupInfo>
                </Popover>
              </createTheme>
            </PetName>

            <PetParagraph>
              <InfoParagraph>
                <InfoItem1>
                  동물종류
                </InfoItem1>
                <InfoItem1>
                  성별
                </InfoItem1>
                <InfoItem1>
                  질병
                </InfoItem1>
                <InfoItem1>
                  나이
                </InfoItem1>
                {
                  props.isOrganization == "ORGANIZATION" //단체이면 입양상태 체크 가능
                    ? <div style={{ marginTop: "19px" }}><Checkbox onChange={onChange} /></div>
                    : <div style={{ marginTop: "19px" }}><Checkbox onChange={onChange} /></div>
                }
              </InfoParagraph>
              <InfoParagraph>
                <InfoItem2>
                  {
                    `${props.species}` == "CAT"
                      ? <>고양이</>
                      : <>강아지</>
                  }
                </InfoItem2>
                <InfoItem2>
                  {
                    `${props.gender}` == "MALE"
                      ? <>남</>
                      : <>여</>
                  }
                </InfoItem2>
                <InfoItem2>
                  {
                    props.illness.map((item) => {
                      return (
                        <>{item.illnessName} &nbsp;</>
                      )
                    })
                  }
                </InfoItem2>
                <InfoItem2>
                  {props.year}살 &nbsp; {props.month}개월 {props.isGuessed == true ? "추정" : ""}
                </InfoItem2>
                {
                  props.isOrganization == "ORGANIZATION"
                    ? <InfoItem2>입양 상태</InfoItem2>
                    : <InfoItem2>입양 상태</InfoItem2>
                }
              </InfoParagraph>
            </PetParagraph>
          </PetInfo>
        </Profile>
        <ProfileIcon>
          <IconSet>
              {props.isOrganization == "PRIVATE"//입양희망자인 경우
                ? <>
                  {
                    likeHeart == "false"
                      ? <AiOutlineHeart size="22" />
                      : <AiFillHeart size="22" />
                  }
                  <Dropdown
                    overlay={<Chat
                      currUser={currUser}
                      organization={props.organization}
                      animalInfo={animalInfo} />}
                    trigger={['click']}>
                    <FiMail size="22" style={{ marginLeft: "22px", color: 'black' }} />
                  </Dropdown>
                </>
                : <>
                  <AiOutlineEdit size="22" onClick={onEditInfo}/>
                  <AiFillDelete size="22" onClick={showConfirm} style={{marginLeft: '22px'}}/>
                </>
            }
          </IconSet>
          {
            props.isAdopted == false//입양 되었을 때 마크 여부
              ? <img src={SuccessMark} style={{ width: "150px" }} />
              : null
          }
        </ProfileIcon>
      </ContainerBanner>
    </RootBanner>
  )
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