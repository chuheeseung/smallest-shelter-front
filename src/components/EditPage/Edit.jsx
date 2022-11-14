import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import { GrCheckbox, GrCheckboxSelected } from 'react-icons/gr';
import style from '../RegisterPage/Register.module.css'
import UploadImg from '../RegisterPage/UploadImg';

import perfect_on from '../../assets/img/perfect_on.png';
import perfect_off from '../../assets/img/perfect_off.png';
import practice_on from '../../assets/img/practice_on.png';
import practice_off from '../../assets/img/practice_off.png';
import lack_on from '../../assets/img/lack_on.png';
import lack_off from '../../assets/img/lack_off.png';
import { Divider, Input, Select, Space, Typography } from 'antd';
import EditRadioGroup from './EditRadioGroup';
import { useRecoilValue } from 'recoil';
import { LoginUserIdx, LoginUserToken } from '../../states/LoginState';
const { Option } = Select;
let index = 0;

function Edit() {
  const navigate = useNavigate();
  const { animalIdx } = useParams();
  const loginUserIdx = useRecoilValue(LoginUserIdx);
  const loginUserToken = useRecoilValue(LoginUserToken);

  const [name, setName] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);
  const [isGuessed, setIsGuessed] = useState(false);
  const [gender, setGender] = useState('');
  const [genderIdx, setGenderIdx] = useState(0);
  const genderList = [
    { name: '수컷(중성화 X)', value: "MALE" },
    { name: '암컷(중성화 X)', value: "FEMALE" },
    { name: '수컷(중성화 O)', value: "MALE_NEUTRAL" },
    { name: '암컷(중성화 O)', value: "FEMALE_NEUTRAL" },
  ];
  const [species, setSpecies] = useState('');
  const speciesList = [
    { name: '강아지', value: 'DOG' },
    { name: '고양이', value: 'CAT' }
  ];
  const [items, setItems] = useState(["홍역", "파보", "코로나", "슬개골",]);
  const [diseaseName, setDiseaseName] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const filteredOptions = items.filter((o) => !selectedItems.includes(o));
  const [checkInit, setCheckInit] = useState([]);
  const [checkVal, setCheckVal] = useState([]);
  const checkArr = ["사회화", "분리불안", "배변 훈련", "짖음", "입질"];
  const checkType = [
    { name: "완벽해요", value: 1, text: "GOOD", img_on: perfect_on, img_off: perfect_off },
    { name: "연습중이에요", value: 2, text: "TRAINING", img_on: practice_on, img_off: practice_off },
    { name: "아직 부족해요", value: 3, text: "BAD", img_on: lack_on, img_off: lack_off }
  ]

  const getInfo = async () => {
    await axios({
      method: 'GET',
      url: `https://sjs.hana-umc.shop/animal/${animalIdx}`,
      headers: {
        withCredentials: true,
        Accept: 'application/json',
      },
    }).then((res) => {
      let data = res.data.result;
      let illnessArr = [];
      const checkObj = [data.socialization, data.separation, data.toilet, data.bark, data.bite]
      const check = [];

      setName(data.name);
      setGender(data.gender)
      setImgUrl(data.mainImgUrl);
      setSpecies(data.species);
      setYear(data.age.year);
      setMonth(data.age.month);
      setIsGuessed(data.age.isGuessed);

      console.log(data)

      genderList.map((e, idx) => {
        (e.value === data.gender) && setGenderIdx(idx + 1)
      })

      data.illness.map((e) => illnessArr.push(e.illnessName))
      setSelectedItems(illnessArr)
      console.log(illnessArr)

      checkObj.map((e, idx) => {
        checkType.map((val) => {
          if (e === val.text) check[idx] = val.value
        })
      })

      setCheckInit(check)
      setCheckVal(checkObj)
    })
  }

  const uploadImage = (img) => {
    setImgUrl(img);
  }

  useEffect(() => {
    getInfo()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(`
    userIdx: ${loginUserIdx},
    userToken: ${loginUserToken}
    name: ${name},
    year: ${year},
    month: ${month},
    isGuessed: ${isGuessed},
    gender: ${gender},
    species: ${species},
    mainImgUrl: ${imgUrl},
    socialization: ${checkVal[0]},
    separation: ${checkVal[1]},
    toilet: ${checkVal[2]},
    bark: ${checkVal[3]},
    bite: ${checkVal[4]},
    illness: ${selectedItems},
  `);
    const res = await axios({
      headers: {
        withCredentials: true,
        "Access-Control-Allow-Origin": "http://localhost:3000",
        'Accept': 'application/json',
        'Authorization': `Bearer ${loginUserToken}`
      },
      method: 'patch',
      url: `https://sjs.hana-umc.shop/auth/organization/animal/${animalIdx}`,
      data: {
        userIdx: loginUserIdx,
        name: name,
        year: year,
        month: month,
        isGuessed: isGuessed,
        gender: gender,
        species: species,
        mainImgUrl: imgUrl,
        socialization: checkVal[0],
        separation: checkVal[1],
        toilet: checkVal[2],
        bark: checkVal[3],
        bite: checkVal[4],
        illness: selectedItems,
      }
    })
    if (res.data) {
      alert('Edited Data');
    }
    navigate('/');
  }

  const setGenderFunc = (e) => {
    const idx = Number(e.target.id) + 1;
    setGender(e.target.value)
    setGenderIdx(idx);
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
      <div className={style.registerTop}><span>수정하기</span></div>
      <form onSubmit={onSubmit}>
        <div className={style.infoWrap}>
          <div className={style.photo}>
            <UploadImg uploadImage={uploadImage} previewUrl={imgUrl} />
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
                <label htmlFor={idx}>
                  <input
                    type="radio"
                    id={idx}
                    name="gender"
                    value={data.value}
                    onChange={setGenderFunc}
                    checked={genderIdx == idx + 1}
                    style={{ display: "none" }}
                    required
                  />
                  {genderIdx == idx + 1 ? <GrCheckboxSelected /> : <GrCheckbox />}
                  <span style={{ marginLeft: "8px", color: "black", position: "relative", top: "-1.5px" }}>{data.name}</span>
                </label>
              ))}
            </p>
            <p>
              <span className={style.title}>나이</span>
              <input
                id="year"
                type='number'
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={style.ageInput}
                min="0"
                required
              />
              <span style={{ color: 'black' }}>살</span>
              <input
                id="month"
                type='number'
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className={style.ageInput}
                min="0"
                required
              />
              <span style={{ color: 'black' }}>개월</span>
              <div className={style.isGuessed} onClick={() => setIsGuessed(!isGuessed)}>
                {isGuessed ? <GrCheckboxSelected size={13} /> : <GrCheckbox size={13} />} <span>추정</span>
              </div>
              <span style={{ fontSize: '12px', color: '#969696', verticalAlign: 'bottom', marginLeft: '16px' }}>※ 1살 미만일 경우 0살로 기입하세요.</span>
            </p>

            <p className={style.speciesInput}>
              <span className={style.title}>동물 종류</span>
              {speciesList.map((data) => (
                <label htmlFor={data.name}>
                  <input
                    type="radio"
                    id={data.name}
                    name="species"
                    value={data.value}
                    onChange={(e) => setSpecies(e.target.value)}
                    checked={species === data.value}
                    style={{ display: "none" }}
                    required
                  />
                  {species === data.value ? <GrCheckboxSelected /> : <GrCheckbox />}
                  <span style={{ marginLeft: "8px", color: "black", position: "relative", top: "-1.5px" }}>{data.name}</span>
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
              <span className={style.title} style={{ marginRight: "6px" }}>행동 문제</span>
              <div className={style.checkWrap}>
                {
                  checkArr.map((item, idx) => (
                    <p className={style.checkList}>
                      <span>{item}</span>
                      <EditRadioGroup item={item} idx={idx} checkType={checkType} setCheckVal={setCheckVal} checkVal={checkVal} checkInit={checkInit} />
                    </p>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
        <input className={style.submitBtn} type="submit" value="수정" />
      </form>
    </div>
  );
}

export default Edit;