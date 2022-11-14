import React from 'react';
import logoImage from '../../assets/img/Group8700.png';
import personalImage from '../../assets/img/signup_person.png';
import groupImage from '../../assets/img/signup_group.png';
import { Link } from 'react-router-dom';
import style from './SelectType.module.css';

function SelectType() {
    return (
        <div className={style.typeContent}>
            <div className={style.typeTitleWrap}>
                <img 
                    className={style.typeTitleImage}
                    src={logoImage}
                    alt={logoImage}
                />
                <div className={style.typeTitle}>회원가입 유형 선택</div>
            </div>
            <div className={style.selectTable}>
                <div className={style.selectTypeWrap}>
                    <div className={style.typeName}>개인(입양자) 회원</div>
                    <div className={style.typeButtonWrap}>
                        <img className={style.typeImage} src={personalImage} alt={personalImage} />
                        <Link to="/signup/private">
                            <button className={style.typeButton}>개인 회원가입</button>
                        </Link>
                    </div>
                </div>
                <div className={style.selectTypeWrap}>
                    <div className={style.typeName}>기관/단체 회원</div>
                    <div className={style.typeButtonWrap}>
                        <img className={style.typeImage} src={groupImage} alt={groupImage} />
                        <Link to="/signup/organization">
                        <button className={style.typeButton}>기관/단체 회원가입</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelectType;