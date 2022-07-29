import React from 'react';
import style from './OrganizationSignUp.module.css';
import logoImage from '../../assets/img/Group8700.png';
import InputForm from './InputForm';

function OrganizationSignUp() {
    return (
        <div className={style.signUpWrap}>
            <div className={style.titleWrap}>
                <img src={logoImage} alt={logoImage} />
                <div className={style.title}>기관/단체 회원가입</div>
            </div>
            <InputForm selectType={"organization"} />
        </div>
    )
}

export default OrganizationSignUp