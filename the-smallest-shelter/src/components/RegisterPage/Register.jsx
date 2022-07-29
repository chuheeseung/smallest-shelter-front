import React, { useState } from 'react';
import style from './Register.module.css';
import UploadImg from './UploadImg';
import { PlusOutlined } from '@ant-design/icons';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import { Divider, Input, Select, Space, Typography } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { storageService } from '../../fbase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import perfect_on from '../../assets/img/perfect_on.png';
import perfect_off from '../../assets/img/perfect_off.png';
import practice_on from '../../assets/img/practice_on.png';
import practice_off from '../../assets/img/practice_off.png';
import lack_on from '../../assets/img/lack_on.png';
import lack_off from '../../assets/img/lack_off.png';
import RadioGroup from './RadioGroup';
const { Option } = Select;
let index = 0;


function Register() {
    const navigate = useNavigate();
    // 이름, 나이, 성별, 종, 질병, 질병 추가 입력, [사회화, 분리불안, 배변훈련, 짖음, 입질], 이미지
    // str, str, int, str, list<String>, object (int), str
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState(0);
    const genderList = ['암컷(중성화 X)', '수컷(중성화 X)', '암컷(중성화 O)', '수컷(중성화 O)'];
    const [species, setSpecies] = useState("");
    const speciesArr = ['강아지', '고양이'];
    const [items, setItems] = useState(["홍역", "파보", "코로나", "슬개골",]);
    const [diseaseName, setDiseaseName] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const filteredOptions = items.filter((o) => !selectedItems.includes(o));
    const [checkVal, setCheckVal] = useState([]);
    const [checkFlag, setCheckFlag] = useState({});
    const checkArr = ["사회화", "분리불안", "배변 훈련", "짖음", "입질"];
    const checkType = [
        { name: "완벽해요", value: 1, img_on: perfect_on, img_off: perfect_off },
        { name: "연습중이에요", value: 2, img_on: practice_on, img_off: practice_off },
        { name: "아직 부족해요", value: 3, img_on: lack_on, img_off: lack_off }
    ]
    const [image, setImage] = useState("");

    const uploadImage = (img) => {
        setImage(img);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        let imgUrl = "";

        if (image !== "") {
            const fileRef = ref(storageService, `images/${name}/`);
            const uploadFile = await uploadString(fileRef, image, "data_url");
            imgUrl = await getDownloadURL(uploadFile.ref);
        }
        console.log(`
        이름: ${name},
        나이: ${age},
        성별: ${gender},
        종: ${species},
        질병: ${selectedItems},
        check 5: ${checkVal},
        사진: ${imgUrl}
      `);
        const res = await axios({
            headers: {
                withCredentials: true,
                "Access-Control-Allow-Origin": "http://localhost:3000",
                'Accept': 'application/json',
            },
            method: 'post',
            url: 'http://hana-umc.shop:8080/new',
            data: {
                name: name,
                age: age,
                socialization: checkVal[0],
                anxiety: checkVal[1],
                train: checkVal[2],
                bark: checkVal[3],
                bite: checkVal[4],
                illness: selectedItems,
                mainImg: imgUrl,
                species: species,
            }
        })
        if (res.data) {
            alert('Added Data');
        }
        navigate('/');
    }

    const onNameChange = (event) => {
        setDiseaseName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        setItems([...items, diseaseName || `New item ${index++}`]);
        setDiseaseName('');
    };

    return (
        <div className={style.container}>
            <div className={style.registerTop}><span>등록하기</span></div>
            <form onSubmit={onSubmit}>
                <div className={style.infoWrap}>
                    <div className={style.photo}>
                        <UploadImg uploadImage={uploadImage} />
                    </div>
                    <div className={style.info}>
                        <p>
                            <label htmlFor="name" className={style.title}>이름</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="이름을(를) 입력하세요"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className={style.nameInput} />
                        </p>
                        <p className={style.genderInput}>
                            <span className={style.title}>성별</span>
                            {genderList.map((data, idx) => (
                                <label htmlFor={data}>
                                    <input
                                        type="radio"
                                        id={data}
                                        name="gender"
                                        value={idx + 1}
                                        onChange={(e) => setGender(Number(e.target.value))}
                                        checked={gender == idx + 1}
                                        style={{ display: "none" }}
                                    />
                                    {gender == idx + 1 ? <GrCheckboxSelected /> : <GrCheckbox />}
                                    <span style={{ marginLeft: "8px", color: "black", position: "relative", top: "-1.5px" }}>{data}</span>
                                </label>
                            ))}
                        </p>
                        <p>
                            <label htmlFor='age' className={style.title}>나이</label>
                            <input
                                id="age"
                                placeholder="나이를 입력하세요"
                                type='number'
                                value={age}
                                onChange={(e) => setAge(e.target.value)}
                                className={style.ageInput}
                            />
                            <span style={{fontSize: '12px', color: '#969696', verticalAlign: 'bottom', marginLeft: '16px'}}>※ 1살 미만일 경우 0살로 기입하세요.</span>
                        </p>
                        <p className={style.speciesInput}>
                            <span className={style.title}>동물 종류</span>
                            {speciesArr.map((data) => (
                                <label htmlFor={data}>
                                    <input
                                        type="radio"
                                        id={data}
                                        name="species"
                                        value={data}
                                        onChange={(e) => setSpecies(e.target.value)}
                                        checked={species === data}
                                        style={{ display: "none" }}
                                    />
                                    {species === data ? <GrCheckboxSelected /> : <GrCheckbox />}
                                    <span style={{ marginLeft: "8px", color: "black", position: "relative", top: "-1.5px" }}>{data}</span>
                                </label>
                            ))}
                        </p>
                        <p className={style.diseaseInput}>
                            <span className={style.title}>질병</span>
                            <Select
                                mode="multiple"
                                value={selectedItems}
                                onChange={setSelectedItems}
                                style={{
                                    textAlign: "center",
                                    width: '180px',
                                }}
                                placeholder="질병을 선택하세요"
                                dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider
                                            style={{
                                                margin: '8px 0',
                                            }}
                                        />
                                        <Space
                                            align="center"
                                            style={{
                                                padding: '0 8px 4px',
                                            }}
                                        >
                                            <Input placeholder="직접 입력" value={diseaseName} onChange={onNameChange} />
                                            <Typography.Link
                                                onClick={addItem}
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <PlusOutlined /> Add item
                                            </Typography.Link>
                                        </Space>
                                    </>
                                )}
                            >
                                {filteredOptions.map((item) => (
                                    <Select.Option key={item} value={item}>
                                        {item}
                                    </Select.Option>
                                ))}
                            </Select>
                        </p>
                        <div style={{ display: "flex" }}>
                            <span className={style.title} style={{marginRight:"6px"}}>행동 문제</span>
                            <div className={style.checkWrap}>
                                {
                                    checkArr.map((item, idx) => (
                                        <p className={style.checkList}>
                                            <span>{item}</span>
                                            <RadioGroup item={item} idx={idx} checkType={checkType} setCheckVal={setCheckVal} checkVal={checkVal}/>
                                        </p>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <input className={style.submitBtn} type="submit" value="완료" />
            </form>
        </div>
    );
}

export default Register;