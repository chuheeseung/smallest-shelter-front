import React, { useState } from 'react';
import styled from 'styled-components';
import { AiOutlinePlus } from 'react-icons/ai';
import RegisterModal from './RegisterModal';
import ReactModal from 'react-modal';
//recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  LoginUserToken,
  LoginRole,
  LoginUserId,
  LoginUserName,
} from '../../states/LoginState';

// import MyModal from "./MyModal";
// import useModals from "./useModals.js";
ReactModal.setAppElement('#root');

export default function HistoryRegister({ isRole, animalIdx }) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    // 여기서 열어준다
    setOpen(true);
  };

  // const handleModalSubmit = () => {
  //     // 모달1 비지니스 로직
  //     setOpen(false);
  // }

  const handleModalCancel = () => setOpen(false);

  return (
    <>
      {
        (isRole = 'ORGANIZATION' ? (
          <>
            <PlusIcon onClick={handleClick}>
              <AiOutlinePlus />
            </PlusIcon>
            <RegisterModal
              isOpen={isOpen}
              onCancel={handleModalCancel}
              animalIdx={animalIdx}
            />
          </>
        ) : null)
      }
    </>
  );
}

const PlusIcon = styled.div`
  border-radius: 15px;
`;
