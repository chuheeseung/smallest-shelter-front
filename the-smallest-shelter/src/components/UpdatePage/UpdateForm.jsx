import React, { useState } from 'react';
import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { 
  LoginRole, 
  LoginUserAddr, 
  LoginUserEmail, 
  LoginUserIdx, 
  LoginUserName, 
  LoginUserPhoneNum, 
  LoginUserToken 
} from '../../states/LoginState';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function UpdateForm() {
  const [isRole, setIsRole] = useRecoilState(LoginRole);
  const [userToken, setUserToken] = useRecoilState(LoginUserToken);
  const [userIdx, setUserIdx] = useRecoilState(LoginUserIdx);
  const [loginUserName, setLoginUserName] = useRecoilState(LoginUserName);
  const [loginUserPhoneNum, setLoginUserPhoneNum] = useRecoilState(LoginUserPhoneNum);
  const [loginUserAddr, setLoginUserAddr] = useRecoilState(LoginUserAddr);
  const [loginUserEmail, setLoginUserEmail] = useRecoilState(LoginUserEmail);

  const [newName, setNewName] = useState('');
  const [newPhoneNum, setNewPhoneNum] = useState('');
  const [newAddr, setNewAddr] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const navigate = useNavigate();

  const updateName = (e) => {
    setNewName(e.target.value);
  };

  const updatePhoneNum = (e) => {
    setNewPhoneNum(e.target.value);
  };

  const updateAddr = (e) => {
    setNewAddr(e.target.value);
  };

  const updateEmail = (e) => {
    setNewEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(newName, newPhoneNum, newAddr, newEmail);
    console.log(userToken);

    // api 통신
    if (isRole === "PRIVATE") {
      await axios({
        headers: {
          withCredentials: true,
          "Access-Control-Allow-Origin": "http://localhost:3000",
          'Accept': 'application/json',
          Authorization: userToken,
        },
        method: "patch",
        url: `https://sjs.hana-umc.shop/auth/private/${userIdx}`,
        params: {
          userIdx: userIdx,
        },
        data: {
          name: newName,
          phoneNumber: newPhoneNum,
          address: newAddr,
          email: newEmail,
        }
      })
      .then((res) => {
        console.log(res);
        setLoginUserName(newName);
        setLoginUserPhoneNum(newPhoneNum);
        setLoginUserAddr(newAddr);
        setLoginUserEmail(newEmail);
        
        alert("회원 정보를 수정했습니다.");
        navigate("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
    }
    else if (isRole === "ORGANIZATION") {
      await axios({
        headers: {
          withCredentials: true,
          "Access-Control-Allow-Origin": "http://localhost:3000",
          'Accept': 'application/json',
          Authorization: userToken,
        },
        method: "patch",
        url: `https://sjs.hana-umc.shop/auth/organization/${userIdx}`,
        params: {
          userIdx: userIdx,
        },
        data: {
          name: newName,
          phoneNumber: newPhoneNum,
          address: newAddr,
          email: newEmail,
        }
      })
      .then((res) => {
        console.log(res);
        setLoginUserName(newName);
        setLoginUserPhoneNum(newPhoneNum);
        setLoginUserAddr(newAddr);
        setLoginUserEmail(newEmail);
        
        alert("회원 정보를 수정했습니다.");
        navigate("/mypage");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <InputLabel>이름</InputLabel>
          <InputForm value={newName} onChange={updateName}></InputForm>
        </div>
        <div>
          <InputLabel>전화번호</InputLabel>
          <InputForm value={newPhoneNum} onChange={updatePhoneNum}></InputForm>
        </div>
        <div>
          <InputLabel>주소</InputLabel>
          <InputForm value={newAddr} onChange={updateAddr}></InputForm>
        </div>
        <div>
          <InputLabel>이메일</InputLabel>
          <InputForm value={newEmail} onChange={updateEmail}></InputForm>
        </div>
        <FormButton type='submit'>수정하기</FormButton>
      </form>
      
    </>
  )
}


const InputWrap = styled.div`

`;

const InputLabel = styled.div`
  width: 700px;
  text-align: left;
  margin: auto;
  margin-top: 10px;
  font-weight: 650;
  font-size: 14px;
`;

const InputForm = styled.input`
  width: 700px;
  height: 35px;
  margin: 5px;
  border: 1.5px solid #d2d2d2;
  border-radius: 10px;

  &:focus {
    outline: 2px solid #fbc22e;
  }
`;


const FormButton = styled.button`
  width: 700px;
  height: 35px;
  margin-top: 15px;
  margin-bottom: 10px;
  color: white;
  background-color: #fbc22e;
  border: 0;
  outline: 0;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    transition: all ease 0.1s;
    transform: scale(1.02);
  }

  &:disabled {
    background-color: #dadada;
    color: white;
  }
`;


