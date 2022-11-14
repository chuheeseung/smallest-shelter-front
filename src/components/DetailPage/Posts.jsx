import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import ReactModal from 'react-modal';
import axios from 'axios';

ReactModal.setAppElement('#root');

export default function Posts(props) {
  const [isOpen, setOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [modalImgUrl, setPostImgUrl] = useState('');

  const handleClick = () => {
    let animalIdx = props.animalIdx;
    let postIdx = props.postIdx;
    // 여기서 열어준다
    axios({
      headers: {
        withCredentials: true,
        Accept: 'application/json',
      },
      method: 'get',
      url: `https://sjs.hana-umc.shop/post?animal_id=${animalIdx}&post_id=${postIdx}`,
      params: {
        animal_id: animalIdx,
        post_id: postIdx,
      },
    }).then((response) => {
      console.log(response);
      let postData = response.data.result;
      setPostContent(postData.content);
      setPostImgUrl(postData.imgUrl);
    });
    setOpen(true);
  };

  const handleModalSubmit = () => {
    // 모달1 비지니스 로직
    setOpen(false);
  };

  const handleModalCancel = () => setOpen(false);

  return (
    <>
      <PhotoContainer onClick={handleClick}>
        <img
          src={props.postImgUrl}
          alt='대표 사진'
          style={{
            width: '220px',
            height: '220px',
            margin: '10px',
            borderRadius: '15px',
            objectFit: 'cover',
          }}
        />
      </PhotoContainer>
      <Modal
        isOpen={isOpen}
        onCancel={handleModalCancel}
        postImgUrl={modalImgUrl}
        postContent={postContent}
        animalIdx={props.animalIdx}
        postIdx={props.postIdx}
        organizationName={props.organizationName}
      />
    </>
  );
}

const PhotoContainer = styled.div`
  margin: 16px;
  border-radius: 15px;
`;
