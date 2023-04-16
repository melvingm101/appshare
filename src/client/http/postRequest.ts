import axios, { AxiosError } from "axios";

const postRequest = async (url: string, body: any, token: string) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        Authorization: token,
      },
    });

    return { data: response.data.data, error: null };
  } catch (err) {
    if (err instanceof AxiosError) {
      return { data: null, error: err.response?.data };
    }
  }
};

export default postRequest;
