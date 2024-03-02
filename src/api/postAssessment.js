import { Axios } from './Axios';

export const postAssessment = async (result, id) => {
  try {
    const response = await Axios.patch(`/application/${result}`, {
      applicationId: id,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
