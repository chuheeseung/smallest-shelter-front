import React, { useState } from 'react';
import style from './Filtering.module.css';
import { Select } from 'antd';
import searchButtonImage from '../../assets/img/search.png';

const { Option } = Select;

function Filtering({ getFilter }) {
  const filterData = {
    species: [null, 'DOG', 'CAT'],
    gender: [null, 'MALE', 'FEMALE', 'MALE_NEUTRAL', 'FEMALE_NEUTRAL'],
    age: [null, 'PUPPY', 'JUNIOR', 'ADULT', 'SENIOR'],
    isAdopted: [null, true, false],
  };

  const [selectedFilter, setSelectedFilter] = useState({
    species: '',
    gender: '',
    age: '',
    isAdopted: '',
  });

  const handleSpeciesChange = (e) => {
    if (e === undefined) {
      e = '';
    }
    console.log('selected ', e);

    setSelectedFilter((selectedFilter) => {
      let newSelect = { ...selectedFilter };
      newSelect['species'] = e;
      return newSelect;
    });
  };

  const handleGenderChange = (e) => {
    if (e === undefined) {
      e = '';
    }
    console.log('selected ', e);

    setSelectedFilter((selectedFilter) => {
      let newSelect = { ...selectedFilter };
      newSelect['gender'] = e;
      return newSelect;
    });
  };

  const handleAgeChange = (e) => {
    if (e === undefined) {
      e = '';
    }
    console.log('selected ', e);

    setSelectedFilter((selectedFilter) => {
      let newSelect = { ...selectedFilter };
      newSelect['age'] = e;
      return newSelect;
    });
  };

  const handleIsAdoptedChange = (e) => {
    if (e === undefined) {
      e = '';
    }
    console.log('selected ', e);

    setSelectedFilter((selectedFilter) => {
      let newSelect = { ...selectedFilter };
      newSelect['isAdopted'] = e;
      return newSelect;
    });
  };

  const handleFilterButton = () => {
    getFilter(selectedFilter);
  };

  return (
    <div className={style.filterContent}>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>동물 종류</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.species[0]}
          onChange={handleSpeciesChange}
          allowClear='true'
        >
          <Option className={style.filterItem} value={filterData.species[0]}>
            전체
          </Option>
          <Option className={style.filterItem} value={filterData.species[1]}>
            강아지
          </Option>
          <Option className={style.filterItem} value={filterData.species[2]}>
            고양이
          </Option>
        </Select>
      </div>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>성별</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.gender[0]}
          onChange={handleGenderChange}
          allowClear='true'
        >
          <Option className={style.filterItem} value={filterData.gender[0]}>
            전체
          </Option>
          <Option className={style.filterItem} value={filterData.gender[1]}>
            수컷(중성화 X)
          </Option>
          <Option className={style.filterItem} value={filterData.gender[2]}>
            암컷(중성화 X)
          </Option>
          <Option className={style.filterItem} value={filterData.gender[3]}>
            수컷(중성화 O)
          </Option>
          <Option className={style.filterItem} value={filterData.gender[4]}>
            암컷(중성화 O)
          </Option>
        </Select>
      </div>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>나이</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.age[0]}
          onChange={handleAgeChange}
          allowClear='true'
        >
          <Option className={style.filterItem} value={filterData.age[0]}>
            전체
          </Option>
          <Option className={style.filterItem} value={filterData.age[1]}>
            Puppy (0살)
          </Option>
          <Option className={style.filterItem} value={filterData.age[2]}>
            Junior (1살~2살)
          </Option>
          <Option className={style.filterItem} value={filterData.age[3]}>
            Adult (3살~8살)
          </Option>
          <Option className={style.filterItem} value={filterData.age[4]}>
            Senior (9살~)
          </Option>
        </Select>
      </div>
      <div className={style.filterWrap}>
        <div className={style.filterTitle}>입양 상태</div>
        <Select
          className={style.filterSection}
          defaultValue={filterData.isAdopted[0]}
          onChange={handleIsAdoptedChange}
          allowClear='true'
        >
          <Option className={style.filterItem} value={filterData.isAdopted[0]}>
            전체
          </Option>
          <Option className={style.filterItem} value={filterData.isAdopted[1]}>
            입양 완료
          </Option>
          <Option className={style.filterItem} value={filterData.isAdopted[2]}>
            보호중
          </Option>
        </Select>
      </div>
      <div className={style.buttonWrap}>
        <button className={style.buttonItem} onClick={handleFilterButton}>
          <img
            className={style.buttonImage}
            src={searchButtonImage}
            alt={searchButtonImage}
          />
        </button>
      </div>
    </div>
  );
}

export default Filtering;
