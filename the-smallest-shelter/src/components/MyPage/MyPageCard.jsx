import React from 'react';
import AdoptedTag from '../../assets/img/adopted.png';
import styled from 'styled-components';

function MyPageCard({ id, photoUrl, name, age, gender, species, isAdopted }) {
  return (
    <>
    <DataContainer>
      <DataPhoto src={photoUrl} alt="사진 url"/>
      <DataInfo>
        <div>
        <h4 style={{fontWeight: "bold", margin: "10px 0 0 0", fontSize: "15px"}}>{name}</h4>
        <p style={{margin: "4px 0 0 0", color: "#969696"}}>{age}</p>
        <p style={{margin: "4px 0 0 0", color: "#969696"}}>{species} / {gender}</p>
        </div>
        {
          isAdopted 
          ? <img src={AdoptedTag} alt="adoptedTag" className="dataAdoptedTag" style={{width: "80px", height: "80px", paddingRight: "6px"}}/>
          : null
        }
      </DataInfo>
    </DataContainer>
    </>
  )
}

export default MyPageCard;

const DataContainer=styled.div`
  width: 200px;
  height: 300px;
  overflow: hidden;
  margin: 10px;
  margin-bottom: 2rem;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
`;

const DataPhoto=styled.img`
  max-width: 100%;
  width: auto !important;
  height: auto !important;
  display: block;
  z-index: -1;
`;

const DataInfo=styled.div`
  padding-left: 4px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;