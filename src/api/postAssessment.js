import { Axios } from './Axios';

export const postAssessment = async (result, applicationId) => {
  try {
    const isPass = result === 'approve';

    const response = await Axios.patch(`/applications/${applicationId}`, {
      isPass: isPass,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
