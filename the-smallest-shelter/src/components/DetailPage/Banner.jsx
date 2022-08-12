import React, { Component, useState } from 'react'
import axios from "axios";
import styled from "styled-components";
import { AiOutlineStar, AiOutlineHeart, AiFillHeart, AiOutlineLike } from "react-icons/ai";
import { FiMail } from 'react-icons/fi';
<<<<<<< HEAD
import { Checkbox, Dropdown} from 'antd';
=======
import { Checkbox, Dropdown } from 'antd';
>>>>>>> f1fc2c2482fdb4d6b99aa00508dac6e37a662304
import 'antd/dist/antd.min.css';
import { createTheme } from '@material-ui/core/styles';
import Popover from "@material-ui/core/Popover";
import SuccessMark from "../../assets/img/SuccessMark.png";
import { Link, useNavigate } from 'react-router-dom';
import ChatPage from '../Chat/ChatPage';
<<<<<<< HEAD

import { 
    useRecoilState, 
  } from 'recoil';
import { LoginUserToken, LoginRole } from '../../states/LoginState';
=======
>>>>>>> f1fc2c2482fdb4d6b99aa00508dac6e37a662304

function Banner(props) {
    const [userToken, setUserToken] = useRecoilState(LoginUserToken);
    const [isRole, setIsRole] = useRecoilState(LoginRole);

    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [likeHeart, setLikeHeart] = useState("true");
    const [checkAdopted, setCheckAdopted]= useState("true");
    // 임시
    const currUser = {
        "id": "JNVe6U0iGlP4A5Pm65UfXgZju0Z2",
        "image": "http://gravatar.com/avatar/ba97c141500abffb0aee54dbcaee59ff?d=identicon",
        "name": "입양희망자"
    };
    const user = {
        "id": "VRHxfEj1c1g0pbsAiYut1x2VzvP2",
        "image": "http://gravatar.com/avatar/0f7c362b0125aaff368169c8acc4dd39?d=identicon",
        "name": "유행사"
    }
    const chatRoomId = getChatRoomId(currUser, user);
    function getChatRoomId(currUser, user) {
        const currUserId = currUser.id
        const userId = user.id
        return userId < currUserId
            ? `${userId}-${currUserId}`
            : `${currUserId}-${userId}`
    }

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        console.log(userToken, isRole);
        let checked = `${e.target.checked}`
        setCheckAdopted(checked);
        console.log(checked);

        // axios.patch(`https://sjs.hana-umc.shop/auth/organization/animal/adopt?animal_id=30`, {animal_id: 30})
        axios.patch('https://sjs.hana-umc.shop/auth/organization/animal/adopt?animal_id=30',
        {   params:{animal_id: 30}, 
            headers: {'Authorization': userToken}}
            // headers: {
            //     // withCredentials: true,
            //     // 'Accept': 'application/json',
            //     'Authorization': userToken,
            // },
        ).then((response) => {
            console.log(response);
        });
    }
        

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
                padding:"20px",
                borderRadius:"20px",
                height:"120px",
                border:"1px solid #D2D2D2",
            
            }
          }
        }
      });
      const likedRes = () => {
        console.log("좋아요 누름");
        axios.get('https://sjs.hana-umc.shop/posts/1')
        .then((res) => {
          let { data } = res;
          let { animalIdx, isLike } = data;
          
          console.log('animalIdx : ' + animalIdx);
          console.log('isLike : ' +isLike);
          setLikeHeart(isLike);
        })
        .catch((err) => {
          console.log(err);
          
        });
      }
        return (
            <RootBanner>
                <DetailTitle>동물 상세 정보</DetailTitle>
                <ContainerBanner>
                    <Profile>
                        <ProfileImg src={props.imgUrl}/>
                        <PetInfo>
                            <PetName> {props.name} / <button onClick={handleClick} style={{background:"none", border:"none", fontWeight:"700",}}>&nbsp;유행사</button>
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
                                        props.isOrganization=="ORGANIZATION" //단체이면 입양상태 체크 가능
                                        ? <div style={{marginTop:"19px"}}><Checkbox onChange={onChange}/></div>
                                        : <div style={{marginTop:"19px"}}><Checkbox onChange={onChange}/></div>
                                    }
                                </InfoParagraph>
                                <InfoParagraph>
                                    <InfoItem2>
                                        {
                                            `${props.species}`=="CAT"
                                            ? <>고양이</>
                                            : <>강아지</>
                                        }
                                    </InfoItem2>
                                    <InfoItem2>
                                        {
                                            `${props.gender}`=="MALE"
                                            ? <>남</>
                                            : <>여</>
                                        }
                                    </InfoItem2>
                                    <InfoItem2>
                                        {
                                            props.illness.map((item)=>{
                                                return(
                                                    <>{item.illnessName} &nbsp;</>
                                                )
                                            })
                                        }
                                    </InfoItem2>
                                    <InfoItem2>
                                        {props.year}살 &nbsp; {props.month}개월 {props.isGuessed==true?"추정":""}
                                    </InfoItem2>
                                    {
                                        props.isOrganization=="ORGANIZATION"
                                        ? <InfoItem2>입양 상태</InfoItem2>
                                        : <InfoItem2>입양 상태</InfoItem2>
                                    }
                                </InfoParagraph>
                            </PetParagraph>
                        </PetInfo>
                    </Profile>
                    <ProfileIcon>
                        <IconSet>
                            {
                                props.isOrganization=="PRIVATE"//입양희망자인 경우
                                ?<>
                                    {
                                        likeHeart=="false"
                                        ? <AiOutlineHeart size="22"/>
                                        : <AiFillHeart size="22"/>
                                    }
<<<<<<< HEAD
                                        <Dropdown overlay={<ChatPage/>} trigger={['click']}><FiMail size="22" style={{marginLeft:"22px", color: 'black'}}/></Dropdown>
=======
                                    <Dropdown overlay={<ChatPage/>} trigger={['click']}><FiMail size="22" style={{marginLeft:"22px", color: 'black'}}/></Dropdown>
>>>>>>> f1fc2c2482fdb4d6b99aa00508dac6e37a662304
                                </>
                                : null
                            }
                        </IconSet>     
                        {
                            props.isAdopted==false//입양 되었을 때 마크 여부
                            ? <img src={SuccessMark} style={{width:"150px"}}/>
                            : null
                        }
                    </ProfileIcon>
                </ContainerBanner>
            </RootBanner>
        )
}

const RootBanner=styled.section`
    width: 100%;
    height: 460px;
    background: #FBC22E;
    font-family: 'SpoqaHanSansNeo-Bold';
    padding: 5px 0px;

`;

const ContainerBanner=styled.div`
    display:flex;
    justify-content:space-between;
    align-content:center;
    width: 100%;
    height: 82%;
    background-color:#ffffff;
    padding: 40px 100px;
`

const Profile= styled.div`
    display:flex;  

`;

const DetailTitle=styled.h3`
    font-weight: 700;
    margin :25px 100px;
    color: white;
    
`;

const ProfileImg= styled.img `
    object-fit: cover;
    border-radius: 10px;
    padding-top: 7px;
    width:275px; 
    height:275px;
`;

const PetInfo=styled.div`
    margin-left: 50px;
`;

const PetName=styled.h1`
    font-weight: 900;
    display:flex;
`;

const GroupTitle=styled.div`
    color:#FBC22E;
    font-weight: 700;
`;

const GroupInfo=styled.div`
    margin-top:3px;
    color:#333333 ;
    font-size:12px;
    font-weight: 700;
`;

const PetParagraph=styled.div`
    display:flex;
    flex-direction:row;
    justify-content:space-between;
    align-items:center;
`

const InfoParagraph=styled.p`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:left;
`;

const InfoItem1=styled.div`
    margin-top:20px;
`

const InfoItem2=styled.div`
    margin-top:23px;
    font-weight:700;
    font-size:13px;
`
const ProfileIcon=styled.div`
    display:flex;
    flex-wrap:wrap;
    flex-direction:column;
    justify-content:space-between;
    align-items:flex-end;

`;

const IconSet=styled.div`
    display:flex;
`;

export default Banner

