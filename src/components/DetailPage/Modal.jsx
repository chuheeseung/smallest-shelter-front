import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import { IoCloseSharp } from 'react-icons/io5';
import axios from 'axios';

import { useRecoilState, useRecoilValue } from 'recoil';
import {
  LoginUserToken,
  LoginRole,
  LoginUserOrgName,
} from '../../states/LoginState';
import { useNavigate } from 'react-router-dom';

const Modal = ({
  isOpen,
  onCancel,
  postImgUrl,
  postContent,
  animalIdx,
  postIdx,
  organizationName,
}) => {
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const loginUserOrgName = useRecoilValue(LoginUserOrgName);

  const navigate = useNavigate();

  const handleClickCancel = () => {
    onCancel();
  };

  const handleDelete = () => {
    if (window.confirm('삭제 하시겠습니까?')) {
      const deleteRes = axios
        .delete(
          `https://sjs.hana-umc.shop/auth/organization/post?animal_id=${animalIdx}&post_id=${postIdx}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          console.log(res);
          onCancel();
        })
        .catch((err) => console.log(err));
    } else {
      console.log('취소되었습니다');
    }
    window.location.reload();
  };

  return (
    <ModalStyleContainer>
      <ReactModal isOpen={isOpen} style={customStyles}>
        <div
          style={{
            objectFit: 'cover',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ width: '80%', height: '550px', display: 'flex' }}>
            <img
              src={postImgUrl}
              alt='대표 사진'
              style={{ width: '80%', height: '100%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ width: '200px', margin: '20px' }}>
                {postContent}
              </div>
            </div>
          </div>
          <div>
            {isRole == 'ORGANIZATION' &&
            loginUserOrgName == organizationName ? (
              <button
                onClick={handleDelete}
                style={{ border: 'none', background: '#fbc22e' }}
              >
                삭제
              </button>
            ) : null}
            <button
              onClick={handleClickCancel}
              style={{ border: 'none', background: 'none' }}
            >
              <IoCloseSharp />
            </button>
          </div>
        </div>
      </ReactModal>
    </ModalStyleContainer>
  );
};

const ModalStyleContainer = styled.div``;

const customStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0, 0.75)',
  },
  content: {
    top: '28%',
    left: '50%',
    width: '75%',
    height: '600px',
    transform: 'translate(-48%, -25%)',
  },
};

export default Modal;
