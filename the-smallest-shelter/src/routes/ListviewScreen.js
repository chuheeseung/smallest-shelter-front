import React, { useEffect, useState } from 'react';
import Filtering from '../components/ListviewPage/Filtering';
import DataItem from '../components/ListviewPage/DataItem';
import Banner from '../components/ListviewPage/Banner';
import { dummy } from '../components/ListviewPage/dataDummy';
import style from './ListviewScreen.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginUserToken, LoginRole, LoginUserIdx } from '../states/LoginState';

const PAGE_SIZE = 10;

export default function ListviewScreen() {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [cardList, setCardList] = useState([]); // 데이터 받아오는 배열
  const [pageNum, setPageNum] = useState(0);

  const handleFilter = async (filters) => {
    const species = filters['species'];
    const gender = filters['gender'];
    const ageBoundary = filters['age'];
    const isAdopted = filters['isAdopted'];
    // const res = await axios({
    //   headers: {
    //     withCredentials: true,
    //     'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     Accept: 'application/json',
    //   },
    //   method: 'POST',
    //   url: 'https://sjs.hana-umc.shop/animal/search',
    //   params: {
    //     page: pageNum,
    //   },
    //   data: {
    //     species: species,
    //     gender: gender,
    //     ageBoundary: ageBoundary,
    //     isAdopted: isAdopted,
    //   },
    // })
    //   .then((response) => {
    //     console.log(response);
    //     setCardList(response.data.result.animal);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    let data = {
      species: species,
      gender: gender,
      ageBoundary: ageBoundary,
      isAdopted: isAdopted,
    };
    await axios
      .post(
        `https://sjs.hana-umc.shop/animal/search?page=0`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': `application/json`,
          },
        },
        {
          params: { page: 0 },
        }
      )
      .then((response) => {
        console.log(response);
      });
  };

  const handlePrevious = () => {
    // axios.get("https://sjs.hana-umc.shop/animals",
    //     {params: {page: (pageNum > 0 ? pageNum - 1 : 0)}},
    //     {withCredentials: true}
    // ).then((res) => {
    //     console.log(res.data.result)
    //     setCardList(res.data.result.animal);
    // });
  };

  const handleNext = () => {
    axios
      .get(
        'https://sjs./hana-umc.shop/animals',
        { params: { page: pageNum + 1 } },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.result);
        setCardList(res.data.result.animal);
      });
  };

  useEffect(() => {
    axios
      .get(
        'https://sjs.hana-umc.shop/animals',
        { params: { page: pageNum } },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.result);
        setCardList(res.data.result.animal);
        console.log(userToken);
      });
  }, []);

  // useEffect(() => {
  //   setCardList(dummy.results);
  //   console.log(userToken);
  // }, []);

  return (
    <>
      <Banner />
      <Filtering getFilter={handleFilter} />
      <div className={style.dataContainer}>
        {cardList.map((item) => {
          return <DataItem key={item.animalIdx} item={item} />;
        })}
      </div>
      <div className={style.buttonWrap}>
        <button className={style.pageButton} onClick={handlePrevious}>
          이전
        </button>
        <button className={style.pageButton} onClick={handleNext}>
          다음
        </button>
      </div>
    </>
  );
}
