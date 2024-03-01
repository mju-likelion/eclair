import { Axios } from './Axios';

export const getIntroductionData = async (
  applicationId,
  setIntroducesFunction,
) => {
  try {
    const response = await Axios.get(
      `/introduces?applicationId=${applicationId}`,
    );
    setIntroducesFunction(response.data.data);
  } catch (error) {
    console.log(error);
  }
};
