import React, { useState } from 'react'
import styled from 'styled-components';
import Modal from "./Modal";
import ReactModal from 'react-modal';

// import MyModal from "./MyModal";
// import useModals from "./useModals.js";
ReactModal.setAppElement('#root');


export default function Posts({ postIdx, imgUrl}) {
    const [isOpen, setOpen] = useState(false);
    const handleClick = () => {
      // 여기서 열어준다
        setOpen(true);
    };

    const handleModalSubmit = () => {
        // 모달1 비지니스 로직
        setOpen(false);
    }

    const handleModalCancel = () => setOpen(false);

    return (
       <>
            <PhotoContainer onClick={handleClick}>
                <img src={imgUrl} alt="대표 사진" style={{width:"220px", height: "220px",margin: "10px", borderRadius:"15px", objectFit: "cover"}}/>
            </PhotoContainer>
            <Modal isOpen={isOpen} onSubmit={handleModalSubmit} onCancel={handleModalCancel} 
            />
        </>
    );
}

const PhotoContainer=styled.div`
    margin: 16px;
    border-radius: 15px;
`;

const PhotoContent=styled.div`
  padding: 8px;
  justify-content: space-between;
  align-items: center;
`;

const PhotoName=styled.div`
  margin: 0;
  font-size: 17px;
  font-weight: bold;
`;

const PhotoInfo=styled.div`
  display: block;
  &:span{
    margin-right: 8px;
  }
`;