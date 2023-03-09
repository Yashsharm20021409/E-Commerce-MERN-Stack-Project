import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDVmZDY3M2ViZDgxY2RhY2ZjYmU1ZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3ODM4NDEwOCwiZXhwIjoxNjc4NjQzMzA4fQ.TNJ_l28QJIBV1OcsJgJqWXC0Jpqjxgep3PPKm-PcCOU";

export const publicRequest = axios.create({
    baseURL:BASE_URL,
});

export const userRequest = axios.create({
    baseURL:BASE_URL,
    header:{token:`Bearer ${TOKEN}`},
});