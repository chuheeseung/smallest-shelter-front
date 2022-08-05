import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../assets/img/Group8700.png';
import style from './Login.module.css';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { LoginState, LoginRole, LoginUserID } from '../../states/LoginState';
import { loginResponse } from './loginDummy';

const User = {
        id: 'test1234',
        pw: '@test1234'
}

function Login() {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginState);
    const [isRole, setIsRole] = useRecoilState(LoginRole);
    const [isUserID, setIsUserID] = useRecoilState(LoginUserID);

    const [id, setId] = useState('');
    const [pw, setPw] = useState('');
    
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [notAllow, setNotAllow] = useState(true);

    let [savedLoginId, setSavedLoginId] = useState("");
    let [savedLoginPw, setSavedLoginPw] = useState("");
    let sessionStorage = window.sessionStorage;

    const handleId = (e) => {
        setId(e.target.value);
        const regex = /^[a-z]+[a-z0-9]{5,19}$/g;
        
        if(regex.test(id)) {
            setIdValid(true);
        }
        else {
            setIdValid(false);
        }
    };

    const handlePassword = (e) => {
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

    const onSubmitButton = () => {
        if(idValid && pwValid) {
            /*
            const submit = async (e) => {
                e.preventDefault();

                console.log(`id: ${id}, pw: ${pw}`);

                const res = await axios({
                    headers: {
                        withCredentials: true,
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        'Accept': 'application/json',
                    },
                    method: 'POST',
                    url: 'http://hana-umc.shop:8080/login',
                    data: {
                        username: id,
                        password: pw,
                    }
                }).then((response) => {
                    console.log(response); // 출력값 확인하기

                    sessionStorage.setItem("userIDx", response.userIdx);
                    sessionStorage.setItem("name", response.name);
                    sessionStorage.setItem("role", response.role);
                    
                    setSavedLoginId(sessionStorage.getItem("id"));
                    setSavedLoginPw(sessionStorage.getItem("pw"));
                    
                    window.location.href = "/";
                }).catch((error) => {
                    console.log(error);
                })
            }
            */
        }

        if(id === User.id && pw === User.pw) {
            alert("로그인에 성공했습니다!");
            sessionStorage.setItem("id", id);
            sessionStorage.setItem("pw", pw);
            
            setSavedLoginId(sessionStorage.getItem("id"));
            setSavedLoginPw(sessionStorage.getItem("pw"));
            

            setIsLoggedIn(true);
            setIsRole(loginResponse.result.role);
            setIsUserID(loginResponse.result.userIdx);
            window.location.href = "/";
        }
        else {
            alert("등록되지 않은 회원입니다.");
        }
    };

    useEffect(() => {
        if(idValid && pwValid) {
            setNotAllow(false);
            return;
        }
        setNotAllow(true);
    }, [idValid, pwValid]);

    return (
        <>
            <div className={style.contentWrap}>
                <img
                    className={style.logoImage}
                    src={logoImage}
                    alt={logoImage}
                />
                <div className={style.inputTitle}>아이디를 입력해주세요</div>
                <div className={style.inputWrap}>
                    <input 
                        type='text'
                        className={style.input}
                        placeholder='아이디'
                        value={id}
                        onChange={handleId}
                    />
                </div>
                <div className={style.errorMessageWrap}>
                    {
                        !idValid && id.length > 0 && (
                            <div>올바른 아이디를 입력해주세요</div>
                        )
                    }
                </div>
                <div className={style.inputTitle}>비밀번호를 입력해주세요</div>
                <div className={style.inputWrap}>
                    <input 
                        type='password'
                        className={style.input}
                        placeholder='영문, 숫자, 특수문자 포함 8자 이상'
                        value={pw}
                        onChange={handlePassword}
                    />
                </div>
                <div className={style.errorMessageWrap}>
                    {
                        !pwValid && pw.length > 0 && (
                            <div>영문, 숫자, 특수문자 포함 8자 이상 입력해주세요</div>
                        )
                    }
                </div>
                <Link to="/signUp" className={style.signUpLink}>
                    회원가입
                </Link>
            </div>
            <div>
                <button 
                    disabled={notAllow} 
                    className={style.bottomButton} 
                    onClick={onSubmitButton}
                >
                    로그인
                </button>
            </div>
        </>
    )
}

export default Login;