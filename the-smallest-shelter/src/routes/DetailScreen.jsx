import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Banner from '../components/DetailPage/Banner';
import Posts from '../components/DetailPage/Posts';
import SliderSection from '../components/DetailPage/SliderSection';
import axios from 'axios';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import HistoryRegister from '../components/DetailPage/HistoryRegister';

import {
  useRecoilState, useRecoilValue,
  // useRecoilValue,
} from 'recoil';
import { LoginImageIndex, LoginRole, LoginUserIdx } from '../states/LoginState';
import { imageArr } from '../components/SignUpPage/InputForm';

function DetailScreen() {
  //recoil : 단체 여부
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const [userIdx, setUserIdx] = useRecoilState(LoginUserIdx);

  //동물 id 넘어옴
  const location = useLocation();
  const id = location.state.id;

  //디테일 페이지에 들어갈 데이터들의 state
  //동물 기본 정보
  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [species, setSpecies] = useState('');
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [isGuessed, setIsGuessed] = useState(false);
  const [gender, setGender] = useState('');
  const [illness, setIllness] = useState([]);
  const [isAdopted, setIsAdopted] = useState(false);

  //동물 특징
  const [socialization, setSocialization] = useState('');
  const [separation, setSeparation] = useState('');
  const [toilet, setToilet] = useState('');
  const [bark, setBark] = useState('');
  const [bite, setBite] = useState('');

  //단체
  const loginImageIndex = useRecoilValue(LoginImageIndex);
  const [organizationMemberId, setOrganizationMemberId] = useState(0);
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [postData, setPostData] = useState([]);
  const [recommand, setRecommand] = useState([]);
  const [organization, setOrganization] = useState({});

  ReactModal.setAppElement('#root');

  const getPosts = async () => {
    await axios({
      method: 'GET',
      url: `https://sjs.hana-umc.shop/animal/${id}`,
      headers: {
        withCredentials: true,
        Accept: 'application/json',
      },
    }).then((response) => {
      let detailData = response.data.result;
      setName(detailData.name);
      setImgUrl(detailData.mainImgUrl);
      setSpecies(detailData.species);
      setYear(detailData.age.year);
      setMonth(detailData.age.month);
      setIsGuessed(detailData.age.isGuessed);
      setGender(detailData.gender);
      setIllness(detailData.illness);
      setIsAdopted(detailData.isAdopted);
      setSocialization(detailData.socialization);
      setSeparation(detailData.separation);
      setToilet(detailData.toilet);
      setBark(detailData.bark);
      setBite(detailData.bite);
      setOrganizationMemberId(detailData.organizationMemberId);
      setOrganizationName(detailData.organizationName);
      setPhoneNumber(detailData.phoneNumber);
      setAddress(detailData.address);
      setPostData(detailData.post);
      setRecommand(detailData.recommandAnimal);
      console.log(response.data.result);

      const obj = {
        id: detailData.organizationMemberId,
        name: detailData.organizationName,
        image: imageArr[loginImageIndex],
      };
      setOrganization(obj);
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <>
        <Banner
          userIdx={userIdx}
          animalIdx={id}
          isOrganization={isRole}
          name={name}
          imgUrl={imgUrl}
          species={species}
          year={year}
          month={month}
          isGuessed={isGuessed}
          gender={gender}
          illness={illness}
          isAdopted={isAdopted}
          organizationName={organizationName}
          phoneNumber={phoneNumber}
          address={address}
          socialization={socialization}
          separation={separation}
          toilet={toilet}
          bark={bark}
          bite={bite}
          organization={organization}
        />
        <PostList>
          <PostListTitle>
            <div style={{ display: 'flex', flex: 1 }}>동물 히스토리</div>
            {isRole == 'ORGANIZTION' ? (
              <HistoryRegister isOrganization={isRole} animalIdx={id} />
            ) : null}
          </PostListTitle>
          <PostContainer>
            {postData.map((item) => {
              return (
                <Posts
                  animalIdx={id}
                  postIdx={item.postIdx}
                  imgUrl={item.postImgUrl}
                />
              );
            })}
          </PostContainer>
        </PostList>
        <SliderContainer>
          <SliderSection recommandAnimal={recommand} />
        </SliderContainer>
      </>
    </>
  );
}

export default DetailScreen;

const PostList = styled.section`
  margin-bottom: 30px;
`;

const PostListTitle = styled.div`
  font-family: 'SpoqaHanSansNeo-Bold';
  font-weight: 700;
  font-size: 18px;
  margin: 25px 90px 25px 90px;
  color: black;
  padding-left: 24px;
  display: flex;
  justify-content: space-between;
`;

const PostContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 0px 90px 50px 90px;
  padding-left: 55px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 2px 5px 10px 5px lightgray;
  justify-content: flex-start;
  height: 500px;
  overflow-y: scroll;
`;

const SliderContainer = styled.div`
  background-color: white;
  border-radius: 15px;
  margin: 0px 50px 0px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
`;
