import React, { useState } from 'react';
import style from './DataItem.module.css';
import AdoptedTag from '../../assets/img/adopted.png';
import { useNavigate } from 'react-router-dom';

function DataItem({ item }) {
  let navigate = useNavigate();

  const handleClick = () => {
    console.log("clicked : ", item.animal_idx);
    navigate('/detail', {
      state: {
        id: item.animal_idx
      }
    });
  };

  const stringGender = () => {
    switch(item.gender) {
      case 'MALE':
        return "수컷(중성화 X)";
      case 'FEMALE':
        return "암컷(중성화 X)";
      case 'MALE_NEUTRAL':
        return "수컷(중성화 O)";
      case 'FEMALE_NEUTRAL':
        return "암컷(중성화 O)";
      default:
        return "";
    }
  };

  return (
    <>
    <div className={style.dataContainer} onClick={handleClick}>
      <img className={style.dataPhoto} src={item.imgUrl} alt="사진 url"/>
      <div className={style.dataInfo}>
        <div>
          <h4>{item.name}</h4>
          <p>{item.year}살 {item.month}개월 {item.isGuessed ? "추정" : ""}</p>
          <p>{item.species} / {stringGender()}</p>
        </div>
        {
          item.isAdopted 
          ? <img src={AdoptedTag} alt="adoptedTag" className={style.dataAdoptedTag} />
          : null
        }
      </div>
    </div>
    </>
  )
}

export default DataItem;