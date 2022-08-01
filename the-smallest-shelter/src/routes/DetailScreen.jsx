import React, {useEffect, useState} from "react";
// import { useLocation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Banner from "../components/DetailPage/Banner";
import Posts from "../components/DetailPage/Posts";
import SliderSection from "../components/DetailPage/SliderSection";
import axios from "axios";
import { DetailResponse } from '../components/DetailPage/dataDummy';
import styled from 'styled-components';
import ReactModal from 'react-modal';
import HistoryRegister from "../components/DetailPage/HistoryRegister";

function DetailScreen() {
    const location = useLocation();
    const id = location.state.id;
    const [isOrganization, setIsOrganization] = useState(true);
    const [name, setName] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [species, setSpecies] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [illness, setIllness] = useState([]);
    const [isAdopted, setIsAdopted] = useState(false);
    const [organizationName , setOrganizationName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address , setAddress] = useState("");
    const [postData, setPostData] = useState([]);
    const [recommand , setRecommand] = useState([]);
    ReactModal.setAppElement('#root');
    useEffect(()=> {
    // useEffect(()=> {axios({
    //     method: "GET",
    //     url: "http://hana-umc.shop:8080/???",
    //     headers: {
    //         withCredentials: true,
    //         "Access-Control-Allow-Origin": "http://localhost:3000",
    //         'Accept': 'application/json',
    //     }
    // })
    //     .then((response) => {
        console.log({id});
            let detailData = DetailResponse.result;
            // let { mainImgUrl, name, species, month, year, gender, IsAdopted, IsOrganization, organizationName, phoneNumber, address, Post, recommandAnimal, illness } = detailData;
            setName(detailData.name);
            setImgUrl(detailData.mainImgUrl);
            setSpecies(detailData.species);
            setAge(`${detailData.year}살 ${detailData.month}개월`);
            setGender(detailData.gender);
            setIllness(detailData.illness);
            setIsAdopted(detailData.IsAdopted);
            setIsOrganization(detailData.IsOrganization);
            setOrganizationName(detailData.organizationName);
            setPhoneNumber(detailData.phoneNumber);
            setAddress(detailData.address);
            setPostData(detailData.Post);
            setRecommand(detailData.recommandAnimal);
            // console.log('이름 : ' + name, 
            //             '이미지: ' + imgUrl,
            //             '종 : ' + species, 
            //             '나이 : ' + age, 
            //             '성별: ' + gender, 
            //             '질병: ' + illness,
            //             '입양여부 : ' + isAdopted, 
            //             '단체이름 : ' + organizationName, 
            //             '단체번호 : ' + phoneNumber, 
            //             '단체주소 : ' + address, 
            //             '단체여부 : ' + isOrganization, 
            //             '게시물: ' + postData, 
            //             '추천동물: ' + recommand);
    });
    return (
        <div>
            <div>
                <Banner 
                    isOrganization={isOrganization}
                    name={name}
                    imgUrl={imgUrl}
                    species={species}
                    age={age}
                    gender={gender}
                    illness={illness}
                    isAdopted={isAdopted}
                    organizationName={organizationName}
                    phoneNumber={phoneNumber}
                    address={address}
                />
                <PostList>
                    <PostListTitle>
                        <div style={{display: 'flex', flex: 1}}>동물 히스토리</div>
                        <HistoryRegister isOrganization={isOrganization} animalIdx={id}/>
                    </PostListTitle>
                    <PostContainer>
                        {
                            postData.map((item) => {
                                return (
                                    <Posts
                                        postIdx = {item.postIdx}
                                        imgUrl = {item.postImgUrl}
                                    />

                                )
                            })
                        }
                    </PostContainer>
                </PostList>
                <SliderContainer>
                    <SliderSection recommandAnimal={recommand}/>
                </SliderContainer>
            </div>

        </div>
    );
}

export default DetailScreen;

const PostList=styled.section`
    margin-bottom:30px;
`;


const PostListTitle=styled.div`
  font-family: 'SpoqaHanSansNeo-Bold';
  font-weight: 700;
  font-size: 18px;
  margin :25px 90px 25px 90px;
  color: black;
  padding-left: 24px;
  display:flex;
  justify-content:space-between;
  
`

const PostContainer=styled.div`
  background-color:white;
  border-radius:15px;
  margin:0px 90px 50px 90px;
  padding-left:55px;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  box-shadow: 2px 5px 10px 5px lightgray;
  justify-content: flex-start;
  height: 500px;
  overflow-y: scroll;
`;

const SliderContainer=styled.div`
  background-color:white;
  border-radius:15px;
  margin:0px 50px 0px 50px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  height: auto;
`;