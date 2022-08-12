//나의 관심동물 패널 컴포넌트
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import MyPageCard from './MyPageCard';
import axios from "axios";
import { likeAnimal_dummydata } from './dataDummy';
import { Pagination } from 'antd';
import { 
    useRecoilState, 
  } from 'recoil';
import { LoginUserToken,LoginUserIdx } from '../../states/LoginState';
const PAGE_SIZE = 10;

function MyLikeAnimal(props){
    const [userToken, setUserToken] = useRecoilState(LoginUserToken);
    const [userID, setUserID] = useRecoilState(LoginUserIdx);

    const [cardList,setCardList] = useState([]); // 데이터 받아오는 배열
    const [pageNum, setPageNum] = useState(0);

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(PAGE_SIZE);

    const handlePrevious = () => {
    //     axios.get("http://hana-umc.shop:8080/auth/private/animals/:1?page=1",
    //         {params: {page: (pageNum > 0 ? pageNum - 1 : 0)}},
    //         {withCredentials: true}
    //     ).then((res) => {
    //         console.log(res.data.result)
    //         setCardList(res.data.result);
    //     });
    };
    const handleNext = () => {
    //     axios.get("http://hana-umc.shop:8080/auth/private/animals/:1?page=2",
    //         {params: {page: pageNum + 1}},
    //         {withCredentials: true}
    //     ).then((res) => {
    //         console.log(res.data.result)
    //         setCardList(res.data.result);
    //     });
    };

    useEffect(() => {
        console.log(userToken, userID)
        axios.get('https://sjs.hana-umc.shop/auth/private/animals/6?page=0',
            {
                params: {page: 0},
                headers: {
                    // withCredentials: true,
                    // 'Accept': 'application/json',
                    'Authorization': userToken,
            }}
            ).then((response) => {
                console.log(response);
            });
    }, []);

    // useEffect(() => { // 처음 로딩 때 dummy를 가져와서 배열에 넣어줌
    //     console.log(likeAnimal_dummydata.results);
    //     setCardList(likeAnimal_dummydata.results);

    // }, []);

    return(
        <>  
            {
                props.isRole=="ORGANIZATION"
                ?<MyLikeTitle>등록한 동물 목록</MyLikeTitle>
                :<MyLikeTitle>나의 관심 동물</MyLikeTitle>
            }
            <DataContainer>
                {
                    cardList.slice(minValue, maxValue)
                        .map((item) => {
                        return (
                            <MyPageCard
                                animalIdx = {item.animalIdx}
                                mainImgUrl = {item.mainImgUrl}
                                name = {item.name}
                                year = {item.age.year}
                                month = {item.age.month}
                                guessed = {item.age.guessed}
                                species = {item.species}
                                isAdopted = {item.IsAdopted}
                                gender = {item.gender}
                            />
                        )
                    })
                }
                
            </DataContainer>
            <ButtonWrap>
                <PageButton onClick={handlePrevious}>이전</PageButton>
                <PageButton onClick={handleNext}>다음</PageButton>
            </ButtonWrap>
        </>
    );
}

const MyLikeTitle= styled.div`
    font-weight:bold;
    padding: 10px 5px 20px 20px;
    border-bottom:1px solid white;
    font-size:15px;
`;

const DataContainer= styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    padding:20px 20px 20px 70px;
    margin: auto;
`;

const ButtonWrap= styled.div`
    width: 100%;
    margin: auto;
    text-align: center;
`;

const PageButton=styled.button`
    margin: 2px 6px;
    border: none;
    background-color: #fbc22e;
    border-radius: 6px;
    color: white;
    font-size: 15px;
    cursor: pointer;
`;


export default MyLikeAnimal;