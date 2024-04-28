import { Axios } from './Axios';

export const getApplication = async (part, pageNum, onlyPass, navigate) => {
  const onlyPassed = onlyPass ? 'true' : 'false';

  try {
    const response = await Axios.get(
      `/applications?part=${part}&pageNum=${pageNum}&only-passed=${onlyPassed}`,
    );
    return response.data.data;
  } catch (error) {
    if (error.response.data.statusCode === '4012') {
      alert(error.response.data.message);
      navigate('/login');
    }
  }
};
