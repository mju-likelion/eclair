import { Axios } from './Axios';

export const postAssessment = async (result, id) => {
  try {
    const path = result === 'approve' ? 'approve' : 'reject';
    const url = `/applications/${path}`;

    const response = await Axios.patch(url, {
      applicationId: id,
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
