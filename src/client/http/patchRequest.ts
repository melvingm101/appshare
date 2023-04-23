import axios, { AxiosError } from "axios";

const patchRequest = async (url: string, body: any, token: string) => {
  try {
    const response = await axios.patch(url, body, {
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

export default patchRequest;
