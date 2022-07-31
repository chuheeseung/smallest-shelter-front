import React, { useState, useEffect } from 'react';
import style from './InputForm.module.css';
import axios from 'axios';

function InputForm({ selectType }) {
    const type = selectType;
    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [addr, setAddr] = useState('');
    const [email, setEmail] = useState('');

    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [phoneNumValid, setPhoneNumValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

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

    const getRandomImage = () => {
        const randomIndex = Math.floor(Math.random() * imageArr.length);
        const profileImage = imageArr[randomIndex];
        return profileImage;
    };

    const onSubmitButton = () => {
        if(idValid && pwValid && name.length > 0 && phoneNumValid && addr.length > 0 && emailValid) {
            const profileImage = getRandomImage();

            console.log(`
                type: ${type},
                id: ${id},
                pw: ${pw},
                name: ${name},
                phoneNum: ${phoneNum},
                addr: ${addr},
                email: ${email},
                profileImg: url(${profileImage}),
            `);
            alert("회원가입이 완료되었습니다!");
            window.location.href = '/signin';

            // const res = await axios({
            //     headers: {
            //         withCredentials: true,
            //         "Access-Control-Allow-Origin": "http://localhost:3000",
            //         'Accept': 'application/json',
            //     },
            //     method: 'post',
            //     url: 'http://hana-umc.shop:8080/priavte/join',
            //     data: {
            //         type: type,
            //         id: id,
            //         pw: pw,
            //         name: name,
            //         phoneNum: phoneNum,
            //         addr: addr,
            //         email: email,
            //     }
            // })
            //  document.location.href = '/signin';
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
                        type="text" 
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