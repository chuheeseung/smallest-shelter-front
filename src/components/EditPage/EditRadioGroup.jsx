import React, { useState } from 'react';

function EditRadioGroup({ item, idx, checkType, setCheckVal, checkVal, checkInit }) {
  const [click, setClick] = useState([]);
  const [checkFlag, setCheckFlag] = useState({});
  const [init, setInit] = useState(true);

  const onChangeCheck = (e) => {
    setInit(!init);
    const { id, value } = e.target;
    checkInit[id] = Number(value);
    setClick(checkInit)

    let tmp = [];
    tmp = checkVal;

    tmp[id] = checkType[Number(value)-1].text;
    console.log(tmp)

    let flagObj = [];
    flagObj = checkFlag
    flagObj[id] = new Array(3).fill(false).fill(true, value-1, value);

    setCheckVal(tmp);
    setCheckFlag(flagObj)
}

  return (
    <div style={{display: "inline-block", marginLeft: '16px'}}>
      {
        checkType.map((check, index) => (
          <>
            <label>
              <input
                id={idx}
                type='radio'
                name={item}
                value={check.value}
                onChange={onChangeCheck}
                checked={init ? checkInit[idx] === index+1 : click[idx] === index+1}
                style={{ display: "none" }}
              />

              {click[idx] === index+1 || checkInit[idx] === index+1
                ? (<img src={check.img_on} style={{ height: '24px' }} />)
                : (<img src={check.img_off} style={{ height: '24px' }} />)}
            </label>
          </>
        ))
      }
    </div>
  );
}

export default EditRadioGroup;