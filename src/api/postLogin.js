import { Axios } from './Axios';

export const postLogin = async () => {
  try {
    const response = await Axios.post(`/auth/login`, {
      managerId: 'a',
      password: 'a',
    });
    console.log(response.data);
    return response.data.statusCode;
  } catch (error) {
    console.log(error);
  }
};
