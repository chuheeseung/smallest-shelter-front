import React, { useState } from 'react';
import style from './Filtering.module.css';
import { Select } from 'antd';
import searchButtonImage from '../../assets/img/search.png';
import trashButtonImage from '../../assets/img/trash.png';

const { Option } = Select;

function Filtering({ ...cardList }) {
  const filterCategory = ['species', 'gender', 'age', 'isAdopted'];
  const filterData = {
    species: ['전체', '강아지', '고양이'],
    gender: ['전체', '암컷', '수컷', '암컷(중성화O)', '수컷(중성화O)'],
    age: ['전체', 'Puppy (0살)', 'Junior (1살~2살)', 'Adult (3살~8살)', 'Senior (9살~)'],
    isAdopted: ['전체', '입양 완료', '보호중'],
  };

  const [data, setData] = useState([]);
  // const [newData, setNewData] = useState([]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleFilterButton = () => {
    // setData(...cardList);
    // console.log(...data);
  };

  const handleResetButton = () => {};


  return (
    <div className={style.filterContent}>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>동물 종류</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.species[0]}
          onChange={handleChange}
        >
          <Option className={style.filterItem} value={filterData.species[1]}>{filterData.species[1]}</Option>
          <Option className={style.filterItem} value={filterData.species[2]}>{filterData.species[2]}</Option>
        </Select>
      </div>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>성별</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.gender[0]}
          onChange={handleChange}
        >
          <Option className={style.filterItem} value={filterData.gender[1]}>{filterData.gender[1]}</Option>
          <Option className={style.filterItem} value={filterData.gender[2]}>{filterData.gender[2]}</Option>
          <Option className={style.filterItem} value={filterData.gender[3]}>{filterData.gender[3]}</Option>
          <Option className={style.filterItem} value={filterData.gender[4]}>{filterData.gender[4]}</Option>
        </Select>
      </div>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>나이</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.age[0]}
          onChange={handleChange}
        >
          <Option className={style.filterItem} value={filterData.age[1]}>{filterData.age[1]}</Option>
          <Option className={style.filterItem} value={filterData.age[2]}>{filterData.age[2]}</Option>
          <Option className={style.filterItem} value={filterData.age[3]}>{filterData.age[3]}</Option>
          <Option className={style.filterItem} value={filterData.age[4]}>{filterData.age[4]}</Option>
        </Select>
      </div>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>
          입양 상태
        </div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.isAdopted[0]}
          onChange={handleChange}
        >
          <Option className={style.filterItem} value={filterData.isAdopted[1]}>{filterData.isAdopted[1]}</Option>
          <Option className={style.filterItem} value={filterData.isAdopted[2]}>{filterData.isAdopted[2]}</Option>
        </Select>
      </div>
      <div className={style.buttonWrap}>
        <button className={style.buttonItem} onClick={handleFilterButton}>
          <img className={style.buttonImage} src={searchButtonImage} alt={searchButtonImage} />
        </button>
        <button className={style.buttonItem} onClick={handleResetButton}>
        <img className={style.buttonImage} src={trashButtonImage} alt={trashButtonImage} />
        </button>
      </div>
    </div>
  )
}

export default Filtering;