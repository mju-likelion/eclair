import { Axios } from './Axios';

export const getApplication = async (part, pageNum, onlyPass) => {
  const isPassed = onlyPass ? '/passed' : '';
  try {
    const response = await Axios.get(
      `/applications${isPassed}?part=${part}&pageNum=${pageNum}`,
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
