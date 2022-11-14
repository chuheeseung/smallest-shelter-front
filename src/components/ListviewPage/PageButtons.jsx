import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ButtonWrap, PageButton } from '../MyPage/MyLikeAnimal';
import { useState } from 'react';
import { PageButtonNum } from '../../states/PageState';

export default function PageButtons({
	handleCardList,
	click,
	pageNum,
	maxPageNum,
	data,
}) {
	const [pageNumber, setPageNumber] = useRecoilState(PageButtonNum);

	const handlePrevious = async () => {
		if (click === true) {
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
						params: { page: pageNum > 0 ? pageNum - 1 : 0 },
					}
				)
				.then((res) => {
					console.log(res.data.result);
					handleCardList(res.data.result.animal);

					if (pageNum > 0) {
						setPageNumber(pageNum - 1);
					} else {
						setPageNumber(0);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (click === false) {
			console.log(2);
			await axios
				.get(
					'https://sjs.hana-umc.shop/animals',
					{ params: { page: pageNum > 0 ? pageNum - 1 : 0 } },
					{ withCredentials: true }
				)
				.then((res) => {
					console.log(res.data.result);
					handleCardList(res.data.result.animal);

					if (pageNum > 0) {
						setPageNumber(pageNum - 1);
					} else {
						setPageNumber(0);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	const handleNext = async () => {
		if (click === true) {
			console.log(3);
			console.log(maxPageNum);
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
						params: { page: pageNum < maxPageNum ? pageNum + 1 : maxPageNum },
					}
				)
				.then((res) => {
					console.log(res.data.result);
					handleCardList(res.data.result.animal);

					if (pageNum < maxPageNum) {
						setPageNumber(pageNum + 1);
					} else {
						setPageNumber(maxPageNum);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} else if (click === false) {
			console.log(4);
			await axios
				.get(
					'https://sjs.hana-umc.shop/animals',
					{ params: { page: pageNum < maxPageNum ? pageNum + 1 : maxPageNum } },
					{ withCredentials: true }
				)
				.then((res) => {
					console.log(res.data.result);
					handleCardList(res.data.result.animal);

					if (pageNum < maxPageNum) {
						setPageNumber(pageNum + 1);
					} else {
						setPageNumber(maxPageNum);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};

	useEffect(() => {
		console.log(maxPageNum);
	}, []);

	return (
		<ButtonWrap>
			<PageButton onClick={handlePrevious}>이전</PageButton>
			<PageButton onClick={handleNext}>다음</PageButton>
		</ButtonWrap>
	);
}
