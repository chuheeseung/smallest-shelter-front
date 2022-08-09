import React, { useEffect, useState } from 'react';
import Filtering from '../components/ListviewPage/Filtering';
import DataItem from '../components/ListviewPage/DataItem';
import Banner from '../components/ListviewPage/Banner';
import { dummy } from '../components/ListviewPage/dataDummy';
import style from './ListviewScreen.module.css';
import { Pagination } from 'antd';
import axios from 'axios';

const PAGE_SIZE = 10;

export default function ListviewScreen() {
    const [cardList,setCardList] = useState([]); // 데이터 받아오는 배열
    const [pageNum, setPageNum] = useState(0);

    const handleFilter = (filters) => {
        console.log(filters);

        /*
        const submit = async (filters) => {
            const res = await axios({
                headers: {
                    withCredentials: true,
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    'Accept': 'application/json',
                },
                method: 'POST',
                url: 'http://hana-umc.shop:8080/search',
                data: {
                    Species: filters[species],
                    Gender: filters[gender],
                    Age: filters[age],
                    isAdopted: filters[isAdopted],
                }
            }).then((response) => {
                console.log(response);
                setCardList(response);
            })
        };
        */

    };

    const handlePrevious = () => {
        // axios.get("http://hana-umc.shop:8080/animal/animals",
        //     {params: {page: (pageNum > 0 ? pageNum - 1 : 0)}},
        //     {withCredentials: true}
        // ).then((res) => {
        //     console.log(res.data.result)
        //     setCardList(res.data.result);
        // });
    };

    const handleNext = () => {
        // axios.get("http://hana-umc.shop:8080/animal/animals",
        //     {params: {page: pageNum + 1}},
        //     {withCredentials: true}
        // ).then((res) => {
        //     console.log(res.data.result)
        //     setCardList(res.data.result);
        // });
    };

    // useEffect(() => {
    //     axios.get("http://hana-umc.shop:8080/animal/animals",
    //         {params: {page: pageNum}},
    //         {withCredentials: true}
    //     ).then((res) => {
    //         console.log(res.data.result)
    //         setCardList(res.data.result);
    //     })
    // }, []);
    

    useEffect(() => { 
        setCardList(dummy.results);
    }, []);

    return (
        <>
            <Banner />
            <Filtering getFilter={handleFilter} />
            <div className={style.dataContainer}>
                {
                    // cardList.slice(minValue, maxValue)
                        cardList.map((item) => {
                        return (
                            <DataItem
                                key={item.animal_idx}
                                item = {item}
                            />
                        )
                    })
                }
            </div>
            <div className={style.buttonWrap}>
                <button className={style.pageButton} onClick={handlePrevious}>이전</button>
                <button className={style.pageButton} onClick={handleNext}>다음</button>
            </div>
        </>
    )
}