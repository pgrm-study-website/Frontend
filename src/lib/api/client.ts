import axios from 'axios';

const client = axios.create({
  withCredentials: true, // 쿠키를 주고받을 수 있게 하는 설정
});

client.defaults.baseURL = process.env.REACT_APP_API_URL; // .env 파일에 입력한 서버 주소

export default client;
