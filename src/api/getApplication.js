import { Axios } from './Axios';

export const getApplication = async (part, pageNum, onlyPass, navigate) => {
  const isPassed = onlyPass ? '/passed' : '';
  try {
    const response = await Axios.get(
      `/applications${isPassed}?part=${part}&pageNum=${pageNum}`,
    );
    return response.data.data;
  } catch (error) {
    if (error.response.data.statusCode === '4012') {
      alert(error.response.data.message);
      navigate('/login');
    }
  }
};
