import { Axios } from './Axios';

export const postsendMail = async () => {
  const timeout = 360000;

  try {
    const response = await Axios.post(`/send-email`, {}, { timeout });
    alert('전송됨');
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
