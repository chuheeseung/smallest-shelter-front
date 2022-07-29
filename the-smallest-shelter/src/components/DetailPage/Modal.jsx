import ReactModal from 'react-modal';
import styled from 'styled-components';
import { IoCloseSharp } from "react-icons/io5"

const Modal = ({ isOpen, onSubmit, onCancel, imgUrl, name, info }) => {
  const handleClickSubmit = () => {
    onSubmit();
  };

  const handleClickCancel = () => {
    onCancel();
  };

  return (
    <ModalStyleContainer>
      <ReactModal isOpen={isOpen} style={customStyles}
      >
        <div style={{ objectFit: "cover",display:"flex", flexWrap:"wrap" ,justifyContent:"space-between"}}>
          <div style={{width:"80%", height: "550px",display:"flex"}}>
            <img src={imgUrl} alt="대표 사진" style={{width:"80%", height: "100%"}}/>
            <div>
              <div style={{ width:"200px",margin:"20px"}}>모달 입니다. 그렇고 저렇고 어쩌구 저쩌구 등등 </div>
            </div>
          </div>
          <div>
            <button onClick={handleClickCancel} style={{border:'none', background:'none'}}><IoCloseSharp/></button>
          </div>
        </div>
      </ReactModal>
    </ModalStyleContainer>
  );
};


const ModalStyleContainer= styled.div`

`;

const customStyles = {
  overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0, 0.75)'
    },
  content: {
    top: '35%',
    left: '50%',
    width: '75%',
    height: '600px',
    transform: 'translate(-48%, -25%)',
  },
};

export default Modal;