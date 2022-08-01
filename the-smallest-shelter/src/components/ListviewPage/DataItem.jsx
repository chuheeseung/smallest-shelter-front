import React from 'react';
import style from './DataItem.module.css';
import AdoptedTag from '../../assets/img/adopted.png';


function DataItem({ id, photoUrl, name, age, gender, species, isAdopted }) {
  const handleClick = () => {
    console.log("clicked : ", id);
    // useNavigate("/detail?id");
  };

  return (
    <>
    <div className={style.dataContainer} onClick={handleClick}>
      <img className={style.dataPhoto} src={photoUrl} alt="사진 url"/>
      <div className={style.dataInfo}>
        <div>
        <h4>{name}</h4>
        <p>{age}</p>
        <p>{species} / {gender}</p>
        </div>
        {
          isAdopted 
          ? <img src={AdoptedTag} alt="adoptedTag" className={style.dataAdoptedTag} />
          : null
        }
      </div>
    </div>
    </>
  )
}

export default DataItem;