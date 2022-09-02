import React, { useEditableControls } from 'react';
import AdoptedTag from '../../assets/img/adopted.png';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function MyPageCard(props) {
  let navigate = useNavigate();

  const handleClick = () => {
    console.log('clicked : ', props.animalIdx);
    navigate('/detail', {
      state: {
        id: props.animalIdx,
      },
    });
  };
  return (
    <>
      <DataContainer onClick={handleClick}>
        <DataPhoto src={props.mainImgUrl} alt='사진 url' />
        <DataInfo>
          <div>
            <h4
              style={{
                fontWeight: 'bold',
                margin: '10px 0 0 0',
                fontSize: '15px',
              }}
            >
              {props.name}
            </h4>
            <p style={{ margin: '4px 0 0 0', color: '#969696' }}>
              {props.year}살 {props.month}개월 {props.guessed ? '추정' : ''}
            </p>
            <p style={{ margin: '4px 0 0 0', color: '#969696' }}>
              {props.species == 'CAT' ? '고양이' : '강아지'} /{' '}
              {props.gender == 'MALE' ? '남' : '여'}
            </p>
          </div>
          {props.isAdopted == false ? null : (
            <img
              src={AdoptedTag}
              alt='adoptedTag'
              className='dataAdoptedTag'
              style={{ width: '80px', height: '80px', paddingRight: '6px' }}
            />
          )}
        </DataInfo>
      </DataContainer>
    </>
  );
}

export default MyPageCard;

const DataContainer = styled.div`
  width: 200px;
  height: 300px;
  overflow: hidden;
  margin: 10px;
  margin-bottom: 2rem;
  border-radius: 5px;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
`;

const DataPhoto = styled.img`
  max-width: 100%;
  width: auto !important;
  height: auto !important;
  display: block;
  z-index: -1;
`;

const DataInfo = styled.div`
  padding-left: 4px;
  justify-content: space-between;
  align-items: center;
  display: flex;
`;
