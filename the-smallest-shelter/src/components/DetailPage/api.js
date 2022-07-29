import React from "react";
import axios from "axios";

export const api = axios.create({
    baseURL: 'https://hana-umc.shop/test/log',
    timeout: 180000,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    }
});