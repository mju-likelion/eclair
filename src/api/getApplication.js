import { Axios } from './Axios';

export const getApplication = async (part, pageNum) => {
  try {
    const response = await Axios.get(
      `/applications?part=${part}&pageNum=${pageNum}`,
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};
