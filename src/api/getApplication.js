import { Axios } from './Axios';

export const getApplication = async (part, pageNum, onlyPass, cancelToken) => {
  const isPassed = onlyPass ? '/passed' : '';
  try {
    const response = await Axios.get(
      `/applications${isPassed}?part=${part}&pageNum=${pageNum}`,
      {
        cancelToken: cancelToken,
      },
    );
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
