//나의 관심동물 패널 컴포넌트
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import MyPageCard from './MyPageCard';
import { dummy } from './dataDummy';
import { Pagination } from 'antd';

const PAGE_SIZE = 10;

function MyLikeAnimal({isOrganization}){
    const [cardList,setCardList] = useState([]); // 데이터 받아오는 배열

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(PAGE_SIZE);

    useEffect(() => { // 처음 로딩 때 dummy를 가져와서 배열에 넣어줌
        setCardList(dummy.results);
    }, []);

    const handleChange = (value) => {
        setMinValue((value - 1) * PAGE_SIZE);
        setMaxValue(value * PAGE_SIZE);
    };


    return(
        <>  
            {
                {isOrganization}
                ?<MyLikeTitle>등록한 동물 목록</MyLikeTitle>
                :<MyLikeTitle>나의 관심 동물</MyLikeTitle>
            }
            <DataContainer>
                {
                    cardList.slice(minValue, maxValue)
                        .map((item) => {
                        return (
                            <MyPageCard
                                key = {item.id}
                                id = {item.id}
                                photoUrl = {item.photo}
                                name = {item.name}
                                age = {item.age}
                                species = {item.species}
                                isAdopted = {item.isAdopted}
                                gender = {item.gender}
                            />
                        )
                    })
                }
                
            </DataContainer>
            <Pagination
                style={{display: 'block', margin: '8px', textAlign: 'center'}}
                defaultCurrent={1}
                defaultPageSize={PAGE_SIZE}
                onChange={handleChange}
                total={cardList.length}
            />
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


export default MyLikeAnimal;