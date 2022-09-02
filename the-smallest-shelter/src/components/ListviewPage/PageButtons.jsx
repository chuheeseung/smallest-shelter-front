import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ButtonWrap, PageButton } from '../MyPage/MyLikeAnimal';
import { useState } from 'react';

export default function PageButtons({ handleCardList, click, pageNum, maxPageNum, data }) {
  // const [clicked, setClicked] = useState(false);

  const handlePrevious = async () => {
    if(click === true) {
      console.log(1);
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
            params: { page: (pageNum > 0 ? pageNum - 1 : 0) },
          }
        )
        .then((res) => {
          console.log(res.data.result);
          handleCardList(res.data.result.animal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (click === false) {
      console.log(2);
      await axios.get("https://sjs.hana-umc.shop/animals",
          {params: {page: (pageNum > 0 ? pageNum - 1 : 0)}},
          {withCredentials: true}
      ).then((res) => {
          console.log(res.data.result);
          handleCardList(res.data.result.animal);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };

  const handleNext = async () => {
    if(click === true) {
      console.log(3);
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
            params: { page: (pageNum < maxPageNum ? pageNum + 1 : maxPageNum) },
          }
        ).then((res) => {
          console.log(res.data.result);
          handleCardList(res.data.result.animal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if (click === false) {
      console.log(4);
      await axios
        .get(
          'https://sjs.hana-umc.shop/animals',
          { params: { page: (pageNum < maxPageNum ? pageNum + 1 : maxPageNum) } },
          { withCredentials: true }
        )
        .then((res) => {
          console.log(res.data.result);
          handleCardList(res.data.result.animal);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  // useState(() => {
  //   setClicked(click);
  //   console.log(clicked);
  // }, []);

  return (
    <ButtonWrap>
      <PageButton onClick={handlePrevious}>이전</PageButton>
      <PageButton onClick={handleNext}>다음</PageButton>
    </ButtonWrap> 
  )
}