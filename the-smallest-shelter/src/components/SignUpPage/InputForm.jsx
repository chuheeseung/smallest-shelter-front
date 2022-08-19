import React, { useState, useEffect } from 'react';
import style from './InputForm.module.css';
import axios from 'axios';
import { Radio } from 'antd';

import image66 from '../../assets/img/ProfileImg/Ellipse 66.png';
import image67 from '../../assets/img/ProfileImg/Ellipse 67.png';
import image68 from '../../assets/img/ProfileImg/Ellipse 68.png';
import image69 from '../../assets/img/ProfileImg/Ellipse 69.png';
import image70 from '../../assets/img/ProfileImg/Ellipse 70.png';
import image71 from '../../assets/img/ProfileImg/Ellipse 71.png';
import image72 from '../../assets/img/ProfileImg/Ellipse 72.png';
import image73 from '../../assets/img/ProfileImg/Ellipse 73.png';
import image74 from '../../assets/img/ProfileImg/Ellipse 74.png';
import image75 from '../../assets/img/ProfileImg/Ellipse 75.png';
import image76 from '../../assets/img/ProfileImg/Ellipse 76.png';
import image77 from '../../assets/img/ProfileImg/Ellipse 77.png';
import image78 from '../../assets/img/ProfileImg/Ellipse 78.png';
import image79 from '../../assets/img/ProfileImg/Ellipse 79.png';
import image80 from '../../assets/img/ProfileImg/Ellipse 80.png';
import image81 from '../../assets/img/ProfileImg/Ellipse 81.png';
import image82 from '../../assets/img/ProfileImg/Ellipse 82.png';
import image83 from '../../assets/img/ProfileImg/Ellipse 83.png';
import image84 from '../../assets/img/ProfileImg/Ellipse 84.png';
import { Navigate, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { LoginUserImage } from '../../states/LoginState';

function InputForm({ selectType }) {
    const navigate = useNavigate();

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [addr, setAddr] = useState('');
    const [email, setEmail] = useState('');
    const [organizationName, setOrganizationName] = useState('');

    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [phoneNumValid, setPhoneNumValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    const imageArr = [
        image66, image67, image68, image69, image70,
        image71, image72, image73, image74, image75,
        image76, image77, image78, image79, image80,
        image81, image82, image83, image84
    ];

    const handleId = (e) => {
        setId(e.target.value);
        const regex = 
        /^[a-z]+[a-z0-9]{5,19}$/g;
        
        if(regex.test(id)) {
            setIdValid(true);
        }
        else {
            setIdValid(false);
        }
    };

    const handlePw = (e) => {
        setPw(e.target.value);
        const regex =
        /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;

        if(regex.test(pw)) {
            setPwValid(true);
        }
        else {
            setPwValid(false);
        }
    };

    const handleName = (e) => {
        setName(e.target.value);
    };

    const handlePhoneNum = (e) => {
        setPhoneNum(e.target.value);
        const regex = /^[0-9\b -]{0,13}$/;

        if (regex.test(phoneNum)) {
            setPhoneNumValid(true);
        } 
        else {
            setPhoneNumValid(false);
        }
    };
    
    const handleAddr = (e) => {
        setAddr(e.target.value);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
        const regex = 
            /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        
        if(regex.test(email)) {
            setEmailValid(true);
        }
        else {
            setEmailValid(false);
        }
    };

    const handleOrganizationCheck = (e) => {
        console.log(e.target.value);
        setOrganizationName(e.target.value);
    };

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageArr.length);
        // const profileImage = imageArr[randomIndex];

        // setImage(profileImage);
        // console.log(image);
        
        return randomIndex;
    };

    const onSubmitButton = async (e) => {
        e.preventDefault();

        if(idValid && pwValid && name.length > 0 && phoneNumValid && addr.length > 0 && emailValid) {
            const profileImageIndex = getRandomImage();

            if(selectType == "private") {
                const res = await axios({
                    headers: {
                        withCredentials: true,
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        'Accept': 'application/json',
                    },
                    method: 'post',
                    url: 'http://sjs.hana-umc.shop:8080/join',
                    data: {
                        username: id,    
                        password: pw,
                        name: name,
                        phoneNumber: phoneNum,
                        address: addr,
                        email: email,
                        profileImgUrl: profileImageIndex,
                        role: "PRIVATE",
                        organizationName: null
                    }
                })
                .then((res) => {
                    alert("개인 회원가입이 완료되었습니다!");
                    navigate('/');
                })
                .catch((err) => {
                    console.log(err);
                })
            } 
            else if(selectType == "organization") {
                const res = await axios({
                    headers: {
                        withCredentials: true,
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        'Accept': 'application/json',
                    },
                    method: 'POST',
                    url: 'http://sjs.hana-umc.shop:8080/join',
                    data: {
                        username: id,
                        password: pw,
                        name: name,
                        phoneNumber: phoneNum,
                        address: addr,
                        email: email,
                        profileImgUrl: profileImageIndex,
                        role: "ORGANIZATION",
                        organizationName: organizationName
                    },
                }).then(() => {
                    alert("단체 회원가입이 완료되었습니다!");
                    window.location.href = '/';
                });
            }
            
        }
    };

    useEffect(() => {
        if (phoneNum.length === 10) {
            setPhoneNum(phoneNum.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
        }
        if (phoneNum.length === 13) {
            setPhoneNum(phoneNum.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phoneNum]);

    useEffect(() => {
        if(idValid && pwValid && phoneNumValid && emailValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [idValid, pwValid, phoneNumValid, emailValid]);

    return (
        <>
            <div className={style.formWrap}>
                <div className={style.inputBlockWrap}>
                    <input 
                        className={style.inputFormBlock} 
                        type="text" 
                        placeholder='아이디'
                        value={id}
                        onChange={handleId}
                    />
                    <div className={style.errorMessageWrap}>
                        {
                            !idValid && id.length > 0 && (
                                <div>올바른 아이디를 입력해주세요</div>
                            )
                        }
                    </div>
                    <input 
                        className={style.inputFormBlock} 
                        type="password" 
                        placeholder='비밀번호'
                        value={pw}
                        onChange={handlePw}
                    />
                    <div className={style.errorMessageWrap}>
                        {
                            !pwValid && pw.length > 0 && (
                                <div>올바른 비밀번호를 입력해주세요</div>
                            )
                        }
                    </div>
                </div>
                <div className={style.divWrap}>
                    <div className={style.inputLabel}>이름</div>
                    <input 
                        className={style.inputForm} 
                        type="text" 
                        placeholder='이름' 
                        value={name}
                        onChange={handleName}
                    />
                    
                </div>
                <div>
                    <div className={style.inputLabel}>전화번호</div>
                    <input 
                        className={style.inputForm} 
                        type="text" 
                        placeholder='010-0000-0000' 
                        value={phoneNum}
                        onChange={handlePhoneNum}
                    />
                </div>
                <div>
                    <div className={style.inputLabel}>주소</div>
                    <input 
                        className={style.inputForm} 
                        type="text" 
                        placeholder='주소' 
                        value={addr}
                        onChange={handleAddr}
                    />
                </div>
                <div>
                    <div className={style.inputLabel}>이메일</div>
                    <input 
                        className={style.inputForm} 
                        type="text" 
                        placeholder='이메일' 
                        value={email}
                        onChange={handleEmail}
                    />
                </div>
                {
                    (selectType === "organization") ? 
                    <div>
                        <div className={style.inputLabel}>단체 선택</div>
                        <Radio.Group onChange={handleOrganizationCheck}>
                            <Radio value={'UHENGSA'}>유행사</Radio>
                            <Radio value={'KARA'}>카라</Radio>
                        </Radio.Group>
                    </div> :
                    <></>
                }
            </div>
            <button 
                disabled={notAllow} 
                className={style.formButton} 
                onClick={onSubmitButton}
            >
                가입하기
            </button>
        </>
        
    )
}

export default InputForm