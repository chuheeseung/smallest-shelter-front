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

    const handleChange = (value) => {
        setMinValue((value - 1) * PAGE_SIZE);
        setMaxValue(value * PAGE_SIZE);
    };

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
                    Species: filters.species,
                    Gender: filters.gender,
                    Age: filters.age,
                    isAdopted: filters.isAdopted,
                }
            }).then((response) => {
                console.log(response);
                setCardList(response);
            })
        };
        */
    };

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
        .then((response) => setCardList(response.data));
    }, []);
    */

    useEffect(() => { 
        setCardList(dummy.results);
    }, []);

    return (
        <>
            <Banner />
            <Filtering getFilter={handleFilter} />
            <div className={style.dataContainer}>
                {
                    cardList.slice(minValue, maxValue)
                        .map((item) => {
                        return (
                            <DataItem
                                key={item.animal_idx}
                                item = {item}
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
