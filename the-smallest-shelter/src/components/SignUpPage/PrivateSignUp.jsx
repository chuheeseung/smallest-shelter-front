import React from 'react';
import style from './PrivateSignUp.module.css';
import logoImage from '../../assets/img/Group8700.png';
import InputForm from './InputForm';

function PrivateSignUp() {
    return (
        <div className={style.signUpWrap}>
            <div className={style.titleWrap}>
                <img src={logoImage} alt={logoImage} />
                <div className={style.title}>개인 회원가입</div>
            </div>
            <InputForm selectType={"private"} />
        </div>
    )
}

export default PrivateSignUp;