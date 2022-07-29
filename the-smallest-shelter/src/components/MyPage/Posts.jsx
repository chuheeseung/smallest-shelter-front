import React, { useState } from 'react';
import styled from 'styled-components';

export default function Posts({ imgUrl, name, info }) {

    return (
       <>
            <PhotoContainer >
                <img src={imgUrl} alt="대표 사진" style={{width:"100px", height: "100px",margin: "10px", borderRadius:"15px", objectFit: "cover"}}/>
                <LikeAnimalPhoto>
                    <div className="photo-name">{name}</div>
                    <div className="photo-info" >
                        <span>{info}</span>
                    </div>
                </LikeAnimalPhoto>
                    
            </PhotoContainer>
        </>



    );
}

const PhotoContainer=styled.div`

    margin: 16px;
    border-radius: 15px;
`;

const LikeAnimalPhoto=styled.div`

`;