import React, { useEffect, useState } from 'react';
import Filtering from '../components/ListviewPage/Filtering';
import DataItem from '../components/ListviewPage/DataItem';
import Banner from '../components/ListviewPage/Banner';
import { dummy } from '../components/ListviewPage/dataDummy';
import style from './ListviewScreen.module.css';
import { Pagination } from 'antd';

const PAGE_SIZE = 10;

export default function ListviewScreen() {
    const [cardList,setCardList] = useState([]); // 데이터 받아오는 배열

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(PAGE_SIZE);

    /*
    useEffect(()=> {axios({
            method: "GET",
            url: "http://hana-umc.shop:8080/list",
            headers: {
                withCredentials: true,
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Accept': 'application/json',
            }
        })
        .then((response) => setData(response.data))
    }, []);
    */

    useEffect(() => { // 처음 로딩 때 dummy를 가져와서 배열에 넣어줌
        setCardList(dummy.results);
    }, []);

    const handleChange = (value) => {
        setMinValue((value - 1) * PAGE_SIZE);
        setMaxValue(value * PAGE_SIZE);
    };

    return (
        <>
            <Banner />
            <Filtering />
            <div className={style.dataContainer}>
                {
                    cardList.slice(minValue, maxValue)
                        .map((item) => {
                        return (
                            <DataItem
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
                
            </div>
            <Pagination
                style={{display: 'block', margin: '8px', textAlign: 'center'}}
                defaultCurrent={1}
                defaultPageSize={PAGE_SIZE}
                onChange={handleChange}
                total={cardList.length}
            />
        </>
    )
}
