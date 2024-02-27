import { Axios } from './Axios';

export const getIntroductionData = async (studentId, setIntroducesFunction) => {
  try {
    const response = await Axios.get(`/introduces?studentId=${studentId}`);
    console.log(response);
    setIntroducesFunction(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
