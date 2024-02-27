import { Axios } from './Axios';

export const getApplication = async () => {
  try {
    const part = 'web';
    const pageNum = 1;
    const response = await Axios.get(
      `/applications?part=${part}&pageNum=${pageNum}`,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
