import React, { useEffect, useState } from 'react';
import Filtering from '../components/ListviewPage/Filtering';
import DataItem from '../components/ListviewPage/DataItem';
import Banner from '../components/ListviewPage/Banner';
import { dummy } from '../components/ListviewPage/dataDummy';
import style from './ListviewScreen.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginUserToken, LoginRole, LoginUserIdx } from '../states/LoginState';
import PageButtons from '../components/ListviewPage/PageButtons';

export default function ListviewScreen() {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [cardList, setCardList] = useState([]); 
  const [pageNum, setPageNum] = useState(0);

  const [click, setClick] = useState(false); 
  const [maxPageNum, setMaxPageNum] = useState(1); 
  const [data, setData] = useState({
    species: "",
    gender: "",
    ageBoundary: "",
    isAdopted: "",
  });

  const handleFilter = async (filters) => {
    let data = {
      species: filters['species'],
      gender: filters['gender'],
      ageBoundary: filters['age'],
      isAdopted: filters['isAdopted'],
    };
    
    setData({
      ...data,
      species: filters['species'],
      gender: filters['gender'],
      ageBoundary: filters['age'],
      isAdopted: filters['isAdopted'],
    });

    await axios
      .post(
        `https://sjs.hana-umc.shop/animal/search?page=${pageNum}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': `application/json`,
          },
        },
        {
          params: { page: pageNum },
        }
      )
      .then((response) => {
        setCardList(response.data.result.animal);
        setPageNum(pageNum);
        setMaxPageNum(response.data.result.pageNumber);
        setClick(true);
        
        console.log(response);
        console.log(click);
      });
  };

  const handleCardList = (data) => {
    setCardList(data);
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
        setPageNum(pageNum);
        setMaxPageNum(res.data.result.pageNumber);
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
      <PageButtons 
        handleCardList={handleCardList} 
        click={click} 
        pageNum={pageNum} 
        maxPageNum={maxPageNum}
        data={data}
      />
    </>
  );
}
